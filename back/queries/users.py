sql_get_all_users = """
SELECT 
    * 
FROM
    users;
"""

sql_get_users = """
SELECT 
    * 
FROM 
    users 
WHERE
    id_users = ?;
"""

sql_create_users = """
INSERT INTO users (
    password_users,
    name_users,
    email_users
) VALUES (
    ?,
    ?,
    ?
) RETURNING id_users;
"""

sql_update_users = """
UPDATE users
SET {columns}
WHERE id_users = ?;
"""

sql_delete_users = """
DELETE FROM
    users
WHERE
    id_users = ?;
"""