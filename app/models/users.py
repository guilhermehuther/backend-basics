from pydantic import BaseModel
from typing import Optional

class CreateUser(BaseModel):
    name_users: str
    email_users: str
    password_users: str

class UpdateUser(BaseModel):
    new_name_users: Optional[str] | None = None
    new_email_users: Optional[str] | None = None
    new_password_users: Optional[str] | None = None