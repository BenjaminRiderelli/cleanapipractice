import express from "express";
import { logInController, registerController } from "../controllers/auth.controller";

const authRouter = express.Router();


authRouter.post("/register", registerController);
authRouter.post("/login",logInController)

export default authRouter