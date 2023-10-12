/// <reference path="../express-augmentations.ts" />
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JwtVerifier, JwtPayload } from "./types";
import { CustomError, unauthorizedCode } from "../utils/customerror";
import { tryCatch } from "../utils/utils";
import { NextFunction, Request, Response } from "express";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export const jwtMiddleware = tryCatch(
  async (req: Request, res: Response, next?: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!jwtSecret) {
      throw new CustomError("500", "Missing secret, Unauthorized", 500);
    }
    if (!authHeader) {
      throw new CustomError(
        unauthorizedCode,
        "Missing header, Unauthorized",
        401
      );
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new CustomError(
        unauthorizedCode,
        "Missing token, Unauthorized",
        401
      );
    }

    let tokenPayload: JwtPayload;
    try {
      tokenPayload = jwt.verify(token, jwtSecret) as JwtPayload;
    } catch (error) {
      throw new CustomError(
        unauthorizedCode,
        "Invalid token, Unauthorized",
        401
      );
    }
    req.jwtPayload = tokenPayload;

    if (next) {
      next();
    }
  }
);

export const jwtVerifier = ({ token, callback }: JwtVerifier) => {
  if (jwtSecret) {
    jwt.verify(token, jwtSecret, callback);
  } else {
    throw new CustomError(unauthorizedCode, "no JWT secret provided", 500);
  }
};
