from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schemas.User])
def read_users(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve users.
    Managers can view all users.
    Admins can view all users.
    Regular users cannot access this endpoint.
    """
    # Check if user has appropriate role (Manager or Admin)
    if not current_user.role or current_user.role.name not in ["Manager", "Admin"]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    return crud.user.get_multi(db)


@router.patch("/{user_id}", response_model=schemas.User)
def update_user_role(
    *,
    db: Session = Depends(deps.get_db),
    user_id: int,
    user_in: schemas.UserUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update a user (Admin only).
    """
    # Check if user has Admin role
    if not current_user.role or current_user.role.name != "Admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Get the user to update
    user = crud.user.get(db, id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update user
    user = crud.user.update(db, db_obj=user, obj_in=user_in)
    return user


@router.post("/windows-login", response_model=schemas.User)
def windows_login(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.WindowsUserCreate,
) -> Any:
    """
    Windows Authentication - auto-create user if not exists.
    """
    # Check if user exists
    user = db.query(models.User).filter(models.User.email == user_in.username).first()
    
    if not user:
        # Create new user with default role "User"
        user_role = crud.role.get_by_name(db, name="User")
        if not user_role:
            # Create default roles if they don't exist
            create_default_roles(db)
            user_role = crud.role.get_by_name(db, name="User")
        
        user_create = schemas.UserCreate(
            email=user_in.username,
            username=user_in.username,
            full_name=user_in.display_name,
            display_name=user_in.display_name,
            role_id=user_role.id if user_role else None
        )
        user = crud.user.create(db, obj_in=user_create)
    
    return user


def create_default_roles(db: Session):
    """
    Create default roles if they don't exist.
    """
    roles = ["User", "Manager", "Admin"]
    for role_name in roles:
        existing_role = crud.role.get_by_name(db, name=role_name)
        if not existing_role:
            role_create = schemas.RoleCreate(name=role_name)
            crud.role.create(db, obj_in=role_create)