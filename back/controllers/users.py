from queries.users import *
from helpers.sqllite import *
from models.users import *
from models.model import *

def get_user(
    id_users: str = None
):
    try:
        if id_users:
            data = query(
                sql=sql_get_users,
                params=[id_users]
            )

            return Response(
                data=data,
                status_code=200,
                message="User retrieved successfully."
            )
        else:
            data = query(sql_get_all_users)

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
        data = query(
            sql=sql_create_users, 
            params=list(body.__dict__.values())
        )
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
        data = query(
            sql=sql_update_users.format(
                columns=values[:-2]
            ),
            params=[id_users]
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
        data = query(
            sql=sql_delete_users,
            params=[id_users]
        )

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
