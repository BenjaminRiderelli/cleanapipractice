import express, { Request, Response, Application } from "express";
import { connectDB } from "./db/connection/index";
import dotenv from "dotenv";
const app: Application = express();
const port = process.env.PORT || 8000;

connectDB().then(()=>console.log("connected to db"))
dotenv.config();

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
