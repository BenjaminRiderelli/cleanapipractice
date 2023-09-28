import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JwtMiddlewareType, JwtVerifier, JwtPayload } from "./types";
import { CustomError } from "../utils/customerror";
import { tryCatch } from "../utils/utils";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const unauthorizedCode = process.env.UNAUTHORIZED || "401";

export const jwtMiddleware = ({ req, res, next }: JwtMiddlewareType) => {
  return tryCatch(async () => {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      throw new CustomError(
        unauthorizedCode,
        "Missing header, Unauthorized",
        401
      );
    const token = authHeader.split(" ")[1];
    if (!token)
      throw new CustomError(
        unauthorizedCode,
        "Missing token, Unauthorized",
        401
      );
    if (!jwtSecret) {
      throw new CustomError(
        unauthorizedCode,
        "Missing token, Unauthorized",
        401
      );
    }

    let tokenPayload;
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
    next();
  });
};

export const jwtVerifier = ({ token, callback }: JwtVerifier) => {
  if (jwtSecret) {
    jwt.verify(token, jwtSecret, callback);
  } else {
    throw new CustomError(unauthorizedCode, "no JWT secret provided", 500);
  }
};
