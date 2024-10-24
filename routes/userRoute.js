import express from "express";
import { fetch ,create,update,remove} from "../controller/userController.js";

const route = express.Router()

route.post('/create',create)

route.get('/fetch',fetch)
route.put('update/:id', update); // Update user by ID
route.delete('delete/:id', remove); // Delete user by ID


export default route;