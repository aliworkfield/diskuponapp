from typing import Optional
from pydantic import BaseModel


# Shared properties
class RoleBase(BaseModel):
    name: Optional[str] = None


# Properties to receive via API on creation
class RoleCreate(RoleBase):
    name: str


# Properties to receive via API on update
class RoleUpdate(RoleBase):
    pass


# Properties shared by models stored in DB
class RoleInDBBase(RoleBase):
    id: int

    class Config:
        from_attributes = True


# Properties to return to client
class Role(RoleInDBBase):
    pass


# Properties properties stored in DB
class RoleInDB(RoleInDBBase):
    pass