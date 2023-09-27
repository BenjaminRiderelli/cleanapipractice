import express, { Application } from "express";
import { connectDB } from "./db/connection/index";
import { errorHandler } from "./middleware/errorhandler";
import generalRouter from "./routers";

import dotenv from "dotenv";
dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8000;

const connection = connectDB().then(() => {
  console.log("connected to db");
});

app.use(express.json());
app.use(generalRouter)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
