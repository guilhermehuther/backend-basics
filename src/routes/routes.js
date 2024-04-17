const express = require("express");
const router = express.Router();

const {
  get_users,
  create_users,
  update_users,
  login_users,
  delete_users,
  update_password_users,
} = require("../controllers/users.js");

router.get("/users", jwt_auth, get_users);
router.post("/users/login", login_users);
router.get("/users/login/senha", update_password_users);
router.post("/users", create_users);
router.put("/users", jwt_auth, update_users);
router.delete("/users", jwt_auth, delete_users);

module.exports = router;
