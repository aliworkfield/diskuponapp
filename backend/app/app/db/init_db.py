from sqlalchemy.orm import Session

from app import crud, schemas
from app.core.config import settings
from app.db import base  # noqa: F401
from app.models import Role

# make sure all SQL Alchemy models are imported (app.db.base) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly
# for more details: https://github.com/tiangolo/full-stack-fastapi-postgresql/issues/28


def init_db(db: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next line
    # Base.metadata.create_all(bind=engine)
    
    # Create default roles
    roles = ["User", "Manager", "Admin"]
    for role_name in roles:
        existing_role = db.query(Role).filter(Role.name == role_name).first()
        if not existing_role:
            role_in = schemas.RoleCreate(name=role_name)
            crud.role.create(db, obj_in=role_in)
    
    user = crud.user.get_by_email(db, email=settings.FIRST_SUPERUSER)
    if not user:
        # Create user auth
        user_in = schemas.UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            username=settings.FIRST_SUPERUSER,
        )
        user = crud.user.create(db, obj_in=user_in)  # noqa: F841
