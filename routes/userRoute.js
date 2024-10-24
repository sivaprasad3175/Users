import express from 'express';
import { fetch, create, login } from "../controller/userController.js";
import { authenticate } from "../controller/userController.js"; // Import the authenticate middleware

const route = express.Router();

// Register a new user
route.post('/register', create);

// Login a user
route.post('/login', login);

// Fetch users (protected route, requires JWT token)
route.get('/fetch', authenticate, fetch);

export default route;
