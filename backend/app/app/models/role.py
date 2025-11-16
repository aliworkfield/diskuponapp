from __future__ import annotations
from typing import TYPE_CHECKING
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer

from app.db.base_class import Base

if TYPE_CHECKING:
    from .user import User  # noqa: F401


class Role(Base):
    __tablename__ = "roles"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, unique=True, index=True)
    
    # Relationships
    users: Mapped[list["User"]] = relationship("User", back_populates="role")