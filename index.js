import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import route from "./routes/userRoute.js";
import cors from 'cors';
import swaggerSpec from './swagger.js';
import swaggerUI from 'swagger-ui-express'

const app = express()
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const corsOptions = {
  origin: 'https://sivaprasad3175.github.io', // Change this to your GitHub Pages URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};

app.use(cors(corsOptions));

app.use(bodyParser.json())
dotenv.config()
const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGOURL;
mongoose.connect(mongoUrl).then((response) => {
   // Create the HTTPS server
app.listen(port, () => {
    console.log(`Secure server running on port ${port}` );
  });
}).catch((error) => {
    console.log(error,'failed')
})

app.use('/api/user',route)