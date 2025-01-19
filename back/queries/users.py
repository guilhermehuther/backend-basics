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
    id_users = '{id_users}';
"""

sql_create_users = """
INSERT INTO users (
    id_users,      
    password_users,
    name_users,
    email_users,     
    created_at_users
) VALUES (
    DEFAULT,
    '{password_users}',
    '{name_users}',
    '{email_users}',
    DEFAULT
) RETURNING id_users;
"""

sql_update_users = """
UPDATE users
SET {values}
WHERE id_users = '{id_users}';
"""

sql_delete_users = """
DELETE FROM
    users
WHERE
    id_users = '{id_users}';
"""