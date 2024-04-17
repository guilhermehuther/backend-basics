const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const { JWT_SECRET, BASE_URL, JWT_TOKEN } = require("../../config");
const pool = require("../helpers/postgresdb");

const {
  sql_get_all_users,
  sql_get_users,
  generate_users_correcao,
  sql_login_users,
  sql_create_users,
  generate_update_users_query,
  sql_delete_users,
  sql_get_users_by_email,
} = require("../queries/users");

const { send_email } = require("../helpers/email");

const get_users = (req, res) => {
  const { id_users, correcao } = req.query;

  if (correcao === "1") {
    pool.query(generate_users_correcao(id_users), (error, results) => {
      if (error) {
        res.status(500).send(`Error getting users correcao ${error}.`);

        return;
      } else {
        res.status(200).json(results.rows);

        return;
      }
    });

    return;
  }

  if (id_users === undefined || id_users === null) {
    pool.query(sql_get_all_users, (error, results) => {
      if (error) {
        res.status(500).send(`Error getting users ${error}.`);

        return;
      } else {
        res.status(200).json(results.rows);

        return;
      }
    });

    return;
  }

  pool.query(sql_get_users, [id_users], (error, results) => {
    if (error) {
      res.status(500).send(`Error getting users ${error}.`);

      return;
    } else {
      res.status(200).json(results.rows);

      return;
    }
  });
};

const login_users = (req, res) => {
  const { cpf_users, senha_users } = req.body;

  pool.query(sql_login_users, [cpf_users], async (error, results) => {
    if (error) {
      res.status(500).send(`Error login users ${error}.`);

      return;
    }

    if (results.rows.length === 0) {
      res.status(401).send("CPF inválido.");

      return;
    }
    if (await bcrypt.compare(senha_users, results.rows[0].senha_users)) {
      const token = jwt.sign({ cpf_users: cpf_users }, JWT_SECRET, {
        expiresIn: "7 days",
      });

      results.rows[0] = { jwt_token: token, ...results.rows[0] };

      res.status(200).json(results.rows[0]);

      return;
    } else {
      res.status(401).send("Senha inválida.");

      return;
    }
  });
};

const create_users = async (req, res) => {
  const {
    cpf_users,
    email_users,
    nome_users,
    senha_users,
    cel_users,
    cidade_users,
    estado_users,
  } = req.body;

  bcrypt
    .hash(senha_users, 10)
    .then((hash) => {
      pool.query(
        sql_create_users,
        [
          cpf_users,
          email_users,
          nome_users,
          hash,
          cel_users,
          cidade_users,
          estado_users,
        ],
        (error, results) => {
          if (error) {
            res.status(500).send(`Error creating users ${error}.`);

            return;
          } else {
            res.status(200).send(results.rows[0]);

            return;
          }
        }
      );
    })
    .catch((error) => {
      res.status(500).send(`Error creating users ${error}.`);

      return;
    });
};

const update_users = async (req, res) => {
  const {
    id_users,
    new_cpf_users,
    new_email_users,
    new_nome_users,
    new_senha_users,
    new_cel_users,
    new_cidade_users,
    new_estado_users,
    new_num_corr_users,
  } = req.body;

  const fields_to_update = {};

  if (new_cpf_users) fields_to_update.cpf_users = new_cpf_users;
  if (new_email_users) fields_to_update.email_users = new_email_users;
  if (new_nome_users) fields_to_update.nome_users = new_nome_users;

  if (new_senha_users) {
    await bcrypt.hash(new_senha_users, 10).then((hash) => {
      fields_to_update.senha_users = hash;
    });
  }

  if (new_cel_users) fields_to_update.cel_users = new_cel_users;
  if (new_cidade_users) fields_to_update.cidade_users = new_cidade_users;
  if (new_estado_users) fields_to_update.estado_users = new_estado_users;
  if (new_num_corr_users) fields_to_update.num_corr_users = new_num_corr_users;

  const { query, values } = generate_update_users_query(fields_to_update);

  values.push(id_users);

  pool.query(query, values, (error, results) => {
    if (error) {
      res.status(500).send(`Error updating id_users: ${id_users}.`);

      return;
    }

    res.status(200).send(`Users modified with id_users: ${id_users}`);

    return;
  });
};

const update_password_users = async (req, res) => {
  const { email_users } = req.query;

  const temp_password = Math.random().toString(36).slice(-8);

  pool.query(sql_get_users_by_email, [email_users], async (error, results) => {
    if (error) {
      res.status(500).send("Erro inesperado, tente novamente.");

      return;
    }

    if (results.rows.length === 0) {
      res.status(404).send("Email inválido.");

      return;
    }
    await axios
      .put(
        `${BASE_URL}/users`,
        {
          id_users: results.rows[0].id_users,
          new_senha_users: temp_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        }
      )
      .then(async (response) => {
        await send_email(
          email_users,
          "Recuperar senha",
          `A sua nova senha é: ${temp_password}
                        
                        Entre no aplicativo da EstudoPlay Redação para trocar a senha.`
        );

        res.status(200).send("Email enviado com sucesso.");

        return;
      })
      .catch((error) => {
        res.status(500).send("Erro inesperado, tente novamente.");

        return;
      });
  });
};

const delete_users = (req, res) => {
  const { id_users } = req.query;

  pool.query(sql_delete_users, [id_users], (error, results) => {
    if (error) {
      res.status(500).send(`Error deleting users ${error}.`);

      return;
    }

    res.status(200).send(`Users deleted with id_users: ${id_users}`);

    return;
  });
};

module.exports = {
  get_users,
  login_users,
  create_users,
  update_users,
  update_password_users,
  delete_users,
};
