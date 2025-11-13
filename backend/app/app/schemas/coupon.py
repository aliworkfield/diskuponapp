from typing import Optional
from datetime import date
from pydantic import BaseModel


# Shared properties
class CouponBase(BaseModel):
    brand: Optional[str] = None
    tag: Optional[str] = None
    code: Optional[str] = None
    expiration_date: Optional[date] = None
    is_assigned: Optional[bool] = False
    assigned_to_user_id: Optional[int] = None


# Properties to receive via API on creation
class CouponCreate(BaseModel):
    brand: str
    tag: str
    code: str
    expiration_date: Optional[date] = None


# Properties to receive via API on update
class CouponUpdate(CouponBase):
    pass


# Properties shared by models stored in DB
class CouponInDBBase(CouponBase):
    id: int

    class Config:
        from_attributes = True


# Properties to return to client
class Coupon(CouponInDBBase):
    pass


# Properties properties stored in DB
class CouponInDB(CouponInDBBase):
    pass


# Properties for coupon assignment
class CouponAssign(BaseModel):
    brand: str
    tag: str
    target_type: str  # "all", "by_tag", "manual"
    target_value: Optional[str] = None  # tag value or comma-separated user IDs
    exclude_users: Optional[str] = None  # comma-separated user IDs to exclude


# Properties for coupon upload
class CouponUpload(BaseModel):
    coupons: list[CouponCreate]