from typing import List

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.user_coupon import UserCoupon
from app.schemas.user_coupon import UserCouponCreate, UserCouponUpdate


class CRUDUserCoupon(CRUDBase[UserCoupon, UserCouponCreate, UserCouponUpdate]):
    def get_by_user_id(self, db: Session, *, user_id: int) -> List[UserCoupon]:
        return db.query(UserCoupon).filter(UserCoupon.user_id == user_id).all()
    
    def get_by_coupon_id(self, db: Session, *, coupon_id: int) -> List[UserCoupon]:
        return db.query(UserCoupon).filter(UserCoupon.coupon_id == coupon_id).all()


user_coupon = CRUDUserCoupon(UserCoupon)