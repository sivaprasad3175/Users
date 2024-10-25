import express from 'express';
import { fetch, create, login,deleteUser ,updateUser,fetchSingleuser} from "../controller/userController.js";
import { authenticate } from "../controller/userController.js"; // Import the authenticate middleware

const route = express.Router();

// Register a new user
route.post('/register', create);

// Login a user
route.post('/login', login);

// Fetch users (protected route, requires JWT token)
route.get('/fetch',authenticate, fetch);

route.delete('/delete/:id',authenticate, deleteUser);
route.put('/update/:id',authenticate, updateUser);
route.post('/fetchSingleuser/:id',authenticate,fetchSingleuser)



export default route;
