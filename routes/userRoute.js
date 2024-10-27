
import express from 'express';
import { fetch, create, login, deleteUser, updateUser, fetchSingleuser } from "../controller/userController.js";
import { authenticate } from "../controller/userController.js";

const route = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API for user management
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               password:
 *                 type: string
 *                 description: The password for the user account
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user
 *               decodePassword:
 *                 type: string
 *                 description: A decoded version of the password (if applicable)
 *             required:
 *               - name
 *               - password
 *               - email
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier for the user
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message detailing why the request failed
 */

route.post('/register', create);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate user and return a JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
route.post('/login', login);

/**
 * @swagger
 * /api/user/fetch:
 *   get:
 *     summary: Fetch all users
 *     description: Retrieve a list of all users (protected route).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   username:
 *                     type: string
 *       401:
 *         description: Unauthorized
 */
route.get('/fetch', authenticate, fetch);

/**
 * @swagger
 * /api/user/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by ID (protected route).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 */
route.delete('/delete/:id', authenticate, deleteUser);

/**
 * @swagger
 * /api/user/update/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update a user by ID (protected route).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
route.put('/update/:id', authenticate, updateUser);

/**
 * @swagger
 * /api/user/fetchSingleuser/{id}:
 *   post:
 *     summary: Fetch a single user
 *     description: Retrieve details of a single user by ID (protected route).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       401:
 *         description: Unauthorized
 */
route.post('/fetchSingleuser/:id', authenticate, fetchSingleuser);

export default route;
