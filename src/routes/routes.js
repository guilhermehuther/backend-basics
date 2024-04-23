const express = require("express");
const router = express.Router();

const {
  get_users,
  create_users,
  update_users,
  delete_users,
} = require("../controllers/users.js");

router.get("/users", get_users);
router.post("/users", create_users);
router.put("/users", update_users);
router.delete("/users", delete_users);

module.exports = router;
