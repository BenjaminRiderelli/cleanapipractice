import express from "express";
import {
  getAllExample,
  getOneExample,
  createOneExample,
  updateOneExample,
  deleteOneExample,
} from "../controllers/example.controller";
const exampleRouter = express.Router();

exampleRouter.get("/", getAllExample);
exampleRouter.get("/:id", getOneExample);
exampleRouter.post("/", createOneExample);
exampleRouter.patch("/:id", updateOneExample);
exampleRouter.delete("/:id", deleteOneExample);

export default exampleRouter;
