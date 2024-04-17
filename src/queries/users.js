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

const sql_get_users_by_email = `
SELECT 
    * 
FROM 
    users 
WHERE
    email_users = $1;
`;

const generate_users_correcao = (id_users) => {
  var sql = `
    SELECT 
        users.*, 
        json_agg(row_to_json(correcao.*)) as users_corr
    FROM 
        users
    LEFT JOIN 
        correcao 
    ON
        users.id_users = correcao.id_users_corr
    `;

  if (id_users) {
    sql += `
        WHERE 
            users.id_users = '${id_users}'
        `;
  }

  sql += `
    GROUP BY 
        users.id_users;
    `;

  return sql;
};

const sql_login_users = `
SELECT 
    users.*, 
	json_agg(row_to_json(correcao.*)) as users_corr
FROM 
    users
LEFT JOIN 
    correcao 
ON 
    users.id_users = correcao.id_users_corr
WHERE
    cpf_users = $1
GROUP BY 
    users.id_users 
`;

const sql_create_users = `
INSERT INTO users (
    id_users,      
    cpf_users,     
    email_users,
    nome_users,   
    senha_users,   
    cel_users,     
    cidade_users,  
    estado_users,  
    num_corr_users,
    data_users
) VALUES (
    DEFAULT,
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    DEFAULT,
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
  sql_get_users_by_email,
  generate_users_correcao,
  sql_login_users,
  sql_create_users,
  generate_update_users_query,
  sql_delete_users,
};
