import { Request, Response } from "express";
import { AuthBodyType } from "./auth.types";
import { emailRegex } from "../middleware/types";
import { User } from "../db/schemas/userSchema.schema";
import {
  CustomError,
  missingDataError,
  unauthorizedCode,
  creatingError,
  wrongRoute,
} from "../utils/customerror";
import { tryCatch } from "../utils/utils";

export const registerController = tryCatch(
  async (req: Request, res: Response) => {
    const data: AuthBodyType = req.body;
    if (!data) {
      throw new CustomError(missingDataError, "no body in the request", 400);
    }
    if (!data.email || !data.email.match(emailRegex)) {
      throw new CustomError(creatingError, "Please enter a valid email", 400);
    }
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new CustomError(creatingError, "user already registered", 400);
    } else {
      const newUser = new User({
        email: data.email,
        password: data.password,
      });
      const savedUser = await newUser.save();
      if (savedUser) {
        return res.status(201).json({
          token: savedUser.generateJWT(),
          user: {
            email: savedUser.email,
            id: savedUser._id,
          },
        });
      } else {
        throw new CustomError(creatingError, "Error generating JWToken", 401);
      }
    }
  }
);

export const logInController = tryCatch(async (req: Request, res: Response) => {
  const { email, password }: AuthBodyType = req.body;
  if (!email || !password) {
    throw new CustomError(missingDataError, "user or password missing", 400);
  }
  const foundUser = await User.findOne({ email });
  if (!foundUser || !foundUser.comparePassword(password)) {
    throw new CustomError(unauthorizedCode, "user or password incorrect", 401);
  }
  return res.status(200).json({
    token: foundUser.generateJWT(),
    user: {
      email: foundUser.email,
      id: foundUser._id,
    },
  });
});
