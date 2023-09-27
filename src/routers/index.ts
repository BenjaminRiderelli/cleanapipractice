import express from "express"
import exampleRouter from "./example.router"
const generalRouter = express.Router()

generalRouter.use("/example", exampleRouter);

export default generalRouter