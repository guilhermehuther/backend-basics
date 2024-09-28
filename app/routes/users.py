from controllers.users import *
from models.users import *
from models.model import *

from fastapi import APIRouter

router = APIRouter()

@router.get(
    "/", 
    response_model=Response, 
    responses={
        500: {
            "model": ResponseError
        }
    }
)
async def get(id_users: str | None = None) -> Response:
    return await get_user(id_users)        

@router.post(
    "/", 
    response_model=Response, 
    responses={
        500: {
            "model": ResponseError
        }
    }
)
async def create(body: CreateUser) -> Response:
    return await create_user(body)

@router.put(
    "/{id_users}", 
    response_model=Response, 
    responses={
        500: {
            "model": ResponseError
        }
    }
)
async def update(id_users: str, body: UpdateUser) -> Response:
    return await update_user(id_users, body)

@router.delete(
    "/{id_users}", 
    response_model=Response, 
    responses={
        500: {
            "model": ResponseError
        }
    }
)
async def delete(id_users: str) -> Response:
    return await delete_user(id_users)