from typing import Optional
from datetime import datetime
from pydantic import BaseModel


# Shared properties
class UserCouponBase(BaseModel):
    user_id: Optional[int] = None
    coupon_id: Optional[int] = None
    assigned_by: Optional[int] = None
    assigned_at: Optional[datetime] = None


# Properties to receive via API on creation
class UserCouponCreate(BaseModel):
    user_id: int
    coupon_id: int
    assigned_by: int


# Properties to receive via API on update
class UserCouponUpdate(UserCouponBase):
    pass


# Properties shared by models stored in DB
class UserCouponInDBBase(UserCouponBase):
    id: int

    class Config:
        from_attributes = True


# Properties to return to client
class UserCoupon(UserCouponInDBBase):
    pass


# Properties properties stored in DB
class UserCouponInDB(UserCouponInDBBase):
    pass