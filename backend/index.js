import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";
import emailRoute from './routes/email.routes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    Credentials: true
}))

const PORT = process.env.PORT || 3000;  //Port Binding

app.use(emailRoute);

app.listen(PORT,() => {
    connectDB();
    console.log(`app is listenning at ${PORT}`);
})