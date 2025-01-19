from pydantic import BaseModel, RootModel
from datetime import datetime
from typing import Optional, List

class User(BaseModel):
    id_users: str
    name_users: str
    password_users: str
    email_users: str
    created_at_users: datetime

class UserResponse(RootModel):
    root: List[User] | List[int]

class CreateUser(BaseModel):
    name_users: str
    email_users: str
    password_users: str

class UpdateUser(BaseModel):
    new_name_users: Optional[str] | None = None
    new_email_users: Optional[str] | None = None
    new_password_users: Optional[str] | None = None
