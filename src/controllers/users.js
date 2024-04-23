const pool = require("../helpers/pg");

const {
  sql_get_all_users,
  sql_get_users,
  sql_create_users,
  generate_update_users_query,
  sql_delete_users,
} = require("../queries/users");

module.exports = {
  get_users,
  create_users,
  update_users,
  delete_users,
};
