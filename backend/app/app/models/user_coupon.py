from __future__ import annotations
from typing import TYPE_CHECKING
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import DateTime, ForeignKey

from app.db.base_class import Base

if TYPE_CHECKING:
    from .user import User  # noqa: F401
    from .coupon import Coupon  # noqa: F401


class UserCoupon(Base):
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    coupon_id: Mapped[int] = mapped_column(ForeignKey("coupons.id"))
    assigned_by: Mapped[int] = mapped_column(ForeignKey("users.id"))
    assigned_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user: Mapped["User"] = relationship("User", foreign_keys=[user_id], back_populates="user_coupons")
    coupon: Mapped["Coupon"] = relationship("Coupon", foreign_keys=[coupon_id], back_populates="user_coupons")
    assigned_by_user: Mapped["User"] = relationship("User", foreign_keys=[assigned_by])