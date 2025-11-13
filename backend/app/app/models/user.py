from __future__ import annotations
from typing import TYPE_CHECKING, Optional
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID
from uuid import uuid4

from app.db.base_class import Base

if TYPE_CHECKING:
    from . import Token  # noqa: F401
    from .role import Role  # noqa: F401
    from .user_coupon import UserCoupon  # noqa: F401


class User(Base):
    id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid4)
    created: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    modified: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        server_onupdate=func.now(),
        nullable=False,
    )
    # METADATA
    full_name: Mapped[str] = mapped_column(index=True, nullable=True)
    email: Mapped[str] = mapped_column(unique=True, index=True, nullable=False)
    hashed_password: Mapped[Optional[str]] = mapped_column(nullable=True)
    role_id: Mapped[Optional[int]] = mapped_column(ForeignKey("roles.id"), nullable=True)
    display_name: Mapped[Optional[str]] = mapped_column(nullable=True)
    # AUTHENTICATION AND PERSISTENCE
    totp_secret: Mapped[Optional[str]] = mapped_column(nullable=True)
    totp_counter: Mapped[Optional[int]] = mapped_column(nullable=True)
    email_validated: Mapped[bool] = mapped_column(default=False)
    is_active: Mapped[bool] = mapped_column(default=True)
    is_superuser: Mapped[bool] = mapped_column(default=False)
    refresh_tokens: Mapped[list["Token"]] = relationship(
        foreign_keys="[Token.authenticates_id]", back_populates="authenticates", lazy="dynamic"
    )
    # Relationships
    role: Mapped[Optional["Role"]] = relationship("Role", back_populates="users")
    user_coupons: Mapped[list["UserCoupon"]] = relationship("UserCoupon", back_populates="user")
