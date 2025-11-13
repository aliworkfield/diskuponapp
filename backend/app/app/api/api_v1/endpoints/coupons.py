from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core.config import settings

router = APIRouter()


@router.post("/upload", response_model=schemas.Msg)
def upload_coupons(
    *,
    db: Session = Depends(deps.get_db),
    coupon_data: schemas.CouponUpload,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Upload coupons (Manager/Admin only).
    """
    # Check if user has appropriate role (Manager or Admin)
    if not current_user.role or current_user.role.name not in ["Manager", "Admin"]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Create coupons
    created_coupons = []
    for coupon_create in coupon_data.coupons:
        # Check if coupon code already exists
        existing_coupon = crud.coupon.get_by_code(db, code=coupon_create.code)
        if existing_coupon:
            raise HTTPException(status_code=400, detail=f"Coupon code {coupon_create.code} already exists")
        
        # Create coupon
        coupon = crud.coupon.create(db, obj_in=coupon_create)
        created_coupons.append(coupon)
    
    return {"msg": f"Successfully uploaded {len(created_coupons)} coupons"}


@router.post("/assign", response_model=schemas.Msg)
def assign_coupons(
    *,
    db: Session = Depends(deps.get_db),
    assignment_data: schemas.CouponAssign,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Assign coupons to users (Manager/Admin only).
    """
    # Check if user has appropriate role (Manager or Admin)
    if not current_user.role or current_user.role.name not in ["Manager", "Admin"]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Get unassigned coupons for the brand and tag
    unassigned_coupons = crud.coupon.get_unassigned_by_brand_and_tag(
        db, brand=assignment_data.brand, tag=assignment_data.tag
    )
    
    if not unassigned_coupons:
        raise HTTPException(status_code=400, detail="No unassigned coupons available for this brand and tag")
    
    # Get target users based on assignment type
    target_users = []
    exclude_user_ids = []
    
    # Parse exclude users
    if assignment_data.exclude_users:
        exclude_user_ids = [int(id.strip()) for id in assignment_data.exclude_users.split(",")]
    
    if assignment_data.target_type == "all":
        # Get all active users except excluded ones
        all_users = crud.user.get_multi(db)
        target_users = [user for user in all_users if user.is_active and user.id not in exclude_user_ids]
    elif assignment_data.target_type == "by_tag":
        # For now, we'll treat the target_value as a role name
        # In a more complex system, you might have user tags
        target_role = crud.role.get_by_name(db, name=assignment_data.target_value)
        if target_role:
            target_users = [user for user in target_role.users if user.is_active and user.id not in exclude_user_ids]
    elif assignment_data.target_type == "manual":
        # Parse user IDs from target_value
        if assignment_data.target_value:
            target_user_ids = [int(id.strip()) for id in assignment_data.target_value.split(",")]
            for user_id in target_user_ids:
                if user_id not in exclude_user_ids:
                    user = crud.user.get(db, id=user_id)
                    if user and user.is_active:
                        target_users.append(user)
    
    if not target_users:
        raise HTTPException(status_code=400, detail="No target users found")
    
    # Assign coupons sequentially
    assignments_made = 0
    for i, user in enumerate(target_users):
        if i >= len(unassigned_coupons):
            break  # No more coupons to assign
        
        coupon = unassigned_coupons[i]
        
        # Update coupon as assigned
        coupon_update = schemas.CouponUpdate(
            is_assigned=True,
            assigned_to_user_id=user.id
        )
        crud.coupon.update(db, db_obj=coupon, obj_in=coupon_update)
        
        # Create user_coupon relationship
        user_coupon_create = schemas.UserCouponCreate(
            user_id=user.id,
            coupon_id=coupon.id,
            assigned_by=current_user.id
        )
        crud.user_coupon.create(db, obj_in=user_coupon_create)
        assignments_made += 1
    
    return {"msg": f"Successfully assigned {assignments_made} coupons"}


@router.get("/", response_model=List[schemas.Coupon])
def read_coupons(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve coupons (all users).
    """
    # Regular users can only see their assigned coupons
    # Managers and Admins can see all coupons
    if current_user.role and current_user.role.name in ["Manager", "Admin"]:
        return crud.coupon.get_multi(db)
    else:
        # Return only assigned coupons for regular users
        return db.query(models.Coupon).filter(models.Coupon.assigned_to_user_id == current_user.id).all()


@router.get("/my-coupons", response_model=List[schemas.Coupon])
def read_my_coupons(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve coupons assigned to the current user.
    """
    return db.query(models.Coupon).filter(models.Coupon.assigned_to_user_id == current_user.id).all()


@router.get("/assignments", response_model=List[schemas.UserCoupon])
def read_assignments(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve all coupon assignments (Manager/Admin only).
    """
    # Check if user has appropriate role (Manager or Admin)
    if not current_user.role or current_user.role.name not in ["Manager", "Admin"]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    return crud.user_coupon.get_multi(db)