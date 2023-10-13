import express, { Application } from "express";
import { connectDB } from "./db/connection/index";
import { errorHandler } from "./middleware/errorhandler";
import cors from "cors"

import generalRouter from "./routers";

import dotenv from "dotenv";
dotenv.config();
const app: Application = express();
app.use(cors());

const port = process.env.PORT || 8000;
const host = process.env.HOST_URL || "http://localhost"

const connection = connectDB().then(() => {
  console.log("connected to db");
});

app.use(express.json());
app.use(generalRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening at ${host}:${port}`);
});
