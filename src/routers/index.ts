import { jwtMiddleware } from "../middleware/security";
import express from "express";
import exampleRouter from "./example.router";
import authRouter from "./auth.router";
const generalRouter = express.Router();

generalRouter.use("/", authRouter);
generalRouter.use("/example",jwtMiddleware, exampleRouter);

export default generalRouter;
