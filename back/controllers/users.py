from queries.users import *
from helpers.pg import *
from models.users import *
from models.model import *

def get_user(
    id_users: str = None
):
    try:
        if id_users:
            data = pg(sql_get_users.format(id_users=id_users))

            return Response(
                data=data,
                status_code=200,
                message="User retrieved successfully."
            )
        else:
            data = pg(sql_get_all_users)

            return Response(
                data=data,
                status_code=200,
                message="Users retrieved successfully."
            )
    except Exception as e:
        return Error(
            status_code=500, 
            message=e
        )

def create_user(
    body: CreateUser
):
    try:
        data = pg(sql_create_users.format(**body.__dict__))
        return Response(
            data=data,
            status_code=200,
            message="User created successfully."
        )
    except Exception as e:
        raise Error(
            status_code=500, 
            message=e
        )

def update_user(
    id_users: str, 
    body: UpdateUser
):
    values = ""
    for k, v in body.__dict__.items():
        if v is not None:
            k = k.replace("new_", "")
            values += f"{k} = '{v}', "

    try:
        data = pg(
            sql_update_users.format(
                values=values[:-2], 
                id_users=id_users
            )
        ) 

        return Response(
            data=data,
            status_code=200,
            message="User updated successfully."
        )
    except Exception as e:
        raise Error(
            status_code=500, 
            message=e
        )

def delete_user(
    id_users: str
):
    try:
        data = pg(sql_delete_users.format(id_users=id_users))

        return Response(
            data=data,
            status_code=200,
            message="User deleted successfully."
        )
    except Exception as e:
        raise Error(
            status_code=500, 
            message=e
        )
