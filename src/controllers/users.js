const pool = require("../helpers/pg");

const {
  sql_get_all_users,
  sql_get_users,
  sql_create_users,
  generate_update_users_query,
  sql_delete_users,
} = require("../queries/users");

const get_users = async (req, res) => {
  const id_users = req.query.id_users;

  if (id_users) {
    pool.query(sql_get_users, [id_users], (err, response) => {
      if (err) {
        res.status(500).send("Error getting user: " + err.message);

        return;
      }

      res.status(200).send(response.rows);

      return;
    });

    return;
  } else {
    pool.query(sql_get_all_users, (err, response) => {
      if (err) {
        res.status(500).send("Error getting users: " + err.message);

        return;
      }

      res.status(200).send(response.rows);

      return;
    });

    return;
  }
};

const create_users = async (req, res) => {
  const { password_users, name_users, email_users } = req.body;

  pool.query(
    sql_create_users,
    [password_users, name_users, email_users],
    (err, response) => {
      if (err) {
        res.status(500).send("Error creating user: " + err.message);

        return;
      }

      res.status(201).send(response.rows);

      return;
    }
  );
};

const update_users = async (req, res) => {
  const { id_users, new_password_users, new_name_users, new_email_users } =
    req.body;

  var fields = {};

  if (new_password_users != undefined && new_password_users) {
    fields["password_users"] = new_password_users;
  }
  if (new_name_users != undefined && new_name_users) {
    fields["name_users"] = new_name_users;
  }
  if (new_email_users != undefined && new_email_users) {
    fields["email_users"] = new_email_users;
  }

  const { query, values } = generate_update_users_query(fields);

  pool.query(query, [...values, id_users], (err, response) => {
    if (err) {
      res.status(500).send("Error updating user: " + err.message);

      return;
    }

    res.status(200).send(`User modified with ID: ${id_users}`);

    return;
  });
};

const delete_users = async (req, res) => {
  const id_users = req.query.id_users;

  pool.query(sql_delete_users, [id_users], (err, response) => {
    if (err) {
      res.status(500).send("Error deleting user: " + err.message);

      return;
    }

    res.status(200).send(`User deleted with ID: ${id_users}`);

    return;
  });
};

module.exports = {
  get_users,
  create_users,
  update_users,
  delete_users,
};
