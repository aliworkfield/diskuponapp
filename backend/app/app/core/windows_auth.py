import os
from typing import Optional
from fastapi import Request, HTTPException, Depends
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.db.session import SessionLocal


def get_current_windows_user(request: Request) -> Optional[str]:
    """
    Extract Windows username from request headers.
    This is a simplified implementation - in a real environment,
    you would extract this from the authentication headers set by IIS or another web server.
    """
    # In a real implementation, you would get this from the authentication headers
    # For example, from IIS with Windows Authentication enabled:
    # username = request.headers.get('X-IIS-WindowsAuthToken')
    
    # For development/testing, we'll use an environment variable or a default
    username = request.headers.get('X-Windows-Username')
    if not username:
        username = os.getenv('WINDOWS_USERNAME', 'devuser@example.com')
    
    return username


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def authenticate_windows_user(
    username: str = Depends(get_current_windows_user),
    db: Session = Depends(get_db)
) -> models.User:
    """
    Authenticate a user via Windows Authentication.
    If the user doesn't exist, create them with default role.
    """
    # Check if user exists
    user = crud.user.get_by_email(db, email=username)
    
    if not user:
        # Create new user with default role "User"
        user_role = crud.role.get_by_name(db, name="User")
        if not user_role:
            # Create default roles if they don't exist
            create_default_roles(db)
            user_role = crud.role.get_by_name(db, name="User")
        
        user_create = schemas.UserCreate(
            email=username,
            username=username,
            full_name=username.split('@')[0],  # Simple name extraction
            display_name=username.split('@')[0],
            role_id=user_role.id if user_role else None
        )
        user = crud.user.create(db, obj_in=user_create)
    
    # Check if user is active
    if not crud.user.is_active(user):
        raise HTTPException(status_code=400, detail="Inactive user")
    
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