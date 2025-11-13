from typing import List, Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.coupon import Coupon
from app.schemas.coupon import CouponCreate, CouponUpdate


class CRUDCoupon(CRUDBase[Coupon, CouponCreate, CouponUpdate]):
    def get_by_code(self, db: Session, *, code: str) -> Optional[Coupon]:
        return db.query(Coupon).filter(Coupon.code == code).first()
    
    def get_by_brand_and_tag(self, db: Session, *, brand: str, tag: str) -> List[Coupon]:
        return db.query(Coupon).filter(Coupon.brand == brand, Coupon.tag == tag).all()
    
    def get_unassigned_by_brand_and_tag(self, db: Session, *, brand: str, tag: str) -> List[Coupon]:
        return db.query(Coupon).filter(
            Coupon.brand == brand, 
            Coupon.tag == tag, 
            Coupon.is_assigned == False
        ).all()


coupon = CRUDCoupon(Coupon)