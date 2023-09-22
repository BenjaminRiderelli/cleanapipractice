import express, {
  Request,
  Response,
  Application,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import { getAll } from "./services/crud-service";
import { Example } from "./db/schemas/exampleSchema.schema";
import { connectDB } from "./db/connection/index";
import dotenv from "dotenv";
dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8000;

const connection = connectDB().then(() => {
  console.log("connected to db");
});

app.get(
  "/example",
  getAll({ model: Example, populationFields: [""], entity: "Example" })
);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
