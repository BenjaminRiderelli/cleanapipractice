import express, { Application } from "express";
import { connectDB } from "./db/connection/index";
import { errorHandler } from "./middleware/errorhandler";
import cors from "cors"
import generalRouter from "./routers";
import dotenv from "dotenv";
const app: Application = express();
dotenv.config();
const port = process.env.PORT || 8000;
const host = process.env.HOST_URL || "http://localhost"


app.use(cors());
const connection = connectDB().then(() => {
  console.log("connected to db");
});

app.use(express.json());
app.use(generalRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening at ${host}:${port}`);
});
