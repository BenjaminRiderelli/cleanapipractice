import express, { Request, Response, Application, NextFunction, ErrorRequestHandler } from "express";
import { connectDB } from "./db/connection/index";
import { tryCatch } from "./utils/utils";
import dotenv from "dotenv";
dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8000;

const connection = connectDB().then(() => {
  console.log("connected to db");
});


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
