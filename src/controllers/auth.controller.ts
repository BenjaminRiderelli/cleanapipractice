import express from "express";
import { Request, Response } from "express";
import { AuthBodyType } from "./auth.types";
import { emailRegex } from "../middleware/types";
import { User } from "../db/schemas/userSchema.schema";
import { CustomError } from "../utils/customerror";
import { tryCatch } from "../utils/utils";

const creationErrorCode = process.env.CREATION_ERROR ?? "500";
const unauthorizedCode = process.env.UNAUTHORIZED ?? "403";
const missingData = process.env.MISSING_DATA ?? "403";

export const registerController = tryCatch(
  async (req: Request, res: Response) => {
    const data: AuthBodyType = req.body;
    if (!data) {
      throw new CustomError(missingData, "no body in the request", 400);
    }
    if (!data.email || !data.email.match(emailRegex)) {
      throw new CustomError(
        creationErrorCode,
        "Please enter a valid email",
        400
      );
    }
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new CustomError(creationErrorCode, "user already registered", 400);
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
        throw new CustomError(
          creationErrorCode,
          "Error generating JWToken",
          401
        );
      }
    }
  }
);

export const logInController = tryCatch(async (req: Request, res: Response) => {
  const { email, password }: AuthBodyType = req.body;
  if (!email || !password) {
    throw new CustomError(missingData, "user or password missing", 400);
  }
  const foundUser = await User.findOne({ email });
  if (!foundUser || !foundUser.comparePassword(password)) {
    throw new CustomError(unauthorizedCode, "user or password incorrect", 401);
  }
  return res.status(200).json({
    token: foundUser.generateJWT(),
    user: {
      email: foundUser.email,
      name: foundUser.name,
      id: foundUser._id,
    },
  });
});

