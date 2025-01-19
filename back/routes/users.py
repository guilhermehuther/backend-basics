from controllers.users import *
from models.users import *
from models.model import *

from fastapi import APIRouter

router = APIRouter()

@router.get(
    "/", 
    response_model=Response, 
    responses={
        500: {"model": Error}
    }
)
def get(id_users: str | None = None):
    return get_user(id_users)        

@router.post(
    "/", 
    response_model=Response, 
    responses={
        500: {"model": Error},
    }
)
def create(body: CreateUser):
    return create_user(body)

@router.put(
    "/{id_users}", 
    response_model=Response, 
    responses={
        500: {"model": Error}
    }
)
def update(id_users: str, body: UpdateUser):
    return update_user(id_users, body)

@router.delete(
    "/{id_users}", 
    response_model=Response, 
    responses={
        500: {"model": Error}
    }
)
def delete(id_users: str):
    return delete_user(id_users)