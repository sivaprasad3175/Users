import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import route from "./routes/userRoute.js";

const app = express()

app.use(cors());
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