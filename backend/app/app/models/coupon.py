from __future__ import annotations
from typing import TYPE_CHECKING, Optional
from datetime import date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Date, Boolean, ForeignKey

from app.db.base_class import Base

if TYPE_CHECKING:
    from .user import User  # noqa: F401
    from .user_coupon import UserCoupon  # noqa: F401


class Coupon(Base):
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    brand: Mapped[str] = mapped_column(String, index=True)
    tag: Mapped[str] = mapped_column(String, index=True)
    code: Mapped[str] = mapped_column(String, unique=True, index=True)
    expiration_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    is_assigned: Mapped[bool] = mapped_column(Boolean, default=False)
    assigned_to_user_id: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id"), nullable=True)
    
    # Relationships
    assigned_to_user: Mapped[Optional["User"]] = relationship("User", foreign_keys=[assigned_to_user_id])
    user_coupons: Mapped[list["UserCoupon"]] = relationship("UserCoupon", back_populates="coupon")