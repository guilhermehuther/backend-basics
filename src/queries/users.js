const sql_get_all_users = `
SELECT 
    * 
FROM 
    users;
`;

const sql_get_users = `
SELECT 
    * 
FROM 
    users 
WHERE
    id_users = $1;
`;

const sql_create_users = `
INSERT INTO users (
    id_users,      
    password_users,
    name_users
    email_users,     
    senha_users,   
    created_at_users
) VALUES (
    DEFAULT,
    $1,
    $2,
    $3,
    $4,
    DEFAULT
) RETURNING id_users;
`;

const generate_update_users_query = (fields) => {
  const setClauses = [];
  const values = [];
  let counter = 1;

  for (const [key, value] of Object.entries(fields)) {
    setClauses.push(`${key} = $${counter++}`);
    values.push(value);
  }

  const query = `
          UPDATE users
          SET ${setClauses.join(", ")}
          WHERE id_users = $${counter};
      `;

  return { query, values };
};

const sql_delete_users = `
DELETE FROM
    users
WHERE
    id_users = $1;
`;

module.exports = {
  sql_get_all_users,
  sql_get_users,
  sql_create_users,
  generate_update_users_query,
  sql_delete_users,
};
