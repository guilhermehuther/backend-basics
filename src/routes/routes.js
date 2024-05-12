const express = require("express");
const router = express.Router();

const {
    get_users,
    create_users,
    update_users,
    delete_users,
} = require("../controllers/users.js");

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all Users OR a specific User.
 *     description: Retrieve all users from the database OR a specific user by their ID.
 *     parameters:
 *       - in: query
 *         name: id_users
 *         schema:
 *           type: uuid
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         required: false
 *         description: The ID of the user to retrieve.
 *
 *     responses:
 *       '200':
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_users:
 *                     type: string
 *                     description: The user's ID.
 *                     example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *                   password_users:
 *                     type: string
 *                     description: The user's password.
 *                     example: easy_password123
 *                   name_users:
 *                     type: string
 *                     description: The user's name.
 *                     example: Guilherme Huther
 *                   email_users:
 *                     type: string
 *                     description: The user's email.
 *                     example: guilhermehuther@gmail.com
 *                   created_at_users:
 *                     type: timestamp
 *                     description: The date and time the user was created.
 *                     example: 2021-09-20T19:52:20.000Z
 *       '500':
 *         description: Internal server error.
 */
router.get("/users", get_users);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new User
 *     description: Add a new user to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_users:
 *                 type: string
 *                 description: The name of the user.
 *                 example: Guilherme Huther
 *               email_users:
 *                 type: string
 *                 description: The email of the user.
 *                 example: guilhermehuther@gmail.com
 *               password_users:
 *                 type: string
 *                 description: The password for the user account.
 *                 example: easy_password123
 *     responses:
 *       '201':
 *         description: Created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_users:
 *                   type: string
 *                   example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *                   description: The newly created user's ID.
 *       '500':
 *         description: Internal server error.
 */
router.post("/users", create_users);

/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Update a User.
 *     description: Update details of an existing user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *              - id_users
 *             type: object
 *             properties:
 *               id_users:
 *                 type: string
 *                 description: The ID of the user to update.
 *                 example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *               new_password_users:
 *                 type: string
 *                 description: The new password of the user.
 *                 example: difficult_password123
 *               new_name_users:
 *                 type: string
 *                 description: The new name of the user.
 *                 example: Guilherme Huther Baldo
 *               new_email_users:
 *                 type: string
 *                 description: The new email for the user account.
 *                 example: guilhermehuther@gmail.com
 *
 *     responses:
 *       '200':
 *         description: User modified with ID:${id_users}.
 *       '500':
 *         description: Internal server error.
 */
router.put("/users", update_users);

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Delete a User.
 *     description: Remove a user from the database by their ID.
 *     parameters:
 *       - in: query
 *         name: id_users
 *         schema:
 *           type: uuid
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         required: true
 *         description: The ID of the user to delete.
 *     responses:
 *       '200':
 *         description: User deleted with ID:${id_users}.
 *       '500':
 *         description: Internal server error.
 */
router.delete("/users", delete_users);

module.exports = router;
