from queries.users import *
from helpers.pg import *
from models.users import *

from fastapi import HTTPException

async def get_user(id_users: str = None):
    try:
        if id_users:
            data = await pg(sql_get_users.format(id_users=id_users))

            if not data:
                raise HTTPException(status_code=404, detail=f"User with id {id_users} not found.")
            return {
                "data": data,
                "status_code": 200,
                "message": "User retrieved successfully."
            }
        else:
            data = await pg(sql_get_all_users)

            if not data:
                return {
                    "data": [],
                    "status_code": 204,
                    "message": "No users found."
                }
            return {
                "data": data,
                "status_code": 200,
                "message": "Users retrieved successfully."
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

async def create_user(body: CreateUser):
    try:
        return {
            "data": await pg(sql_create_users.format(**body.__dict__)),
            "status_code": 201,
            "message": "User created successfully."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")

async def update_user(id_users: str, body: UpdateUser):
    values = ""
    for k, v in body.__dict__.items():
        if v is not None:
            k = k.replace("new_", "")
            values += f"{k} = '{v}', "

    try:
        return {
            "data": await pg(sql_update_users.format(values=values[:-2], id_users=id_users)),
            "status_code": 200,
            "message": "User updated successfully."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update user: {str(e)}")

async def delete_user(id_users: str):
    try:
        return {
            "data": await pg(sql_delete_users.format(id_users=id_users)),
            "status_code": 200,
            "message": "User deleted successfully."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete user: {str(e)}")
