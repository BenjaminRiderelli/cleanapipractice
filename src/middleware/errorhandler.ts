import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customerror";

export const errorHandler = (
  error: Error | CustomError | unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      message: error.message,
    });
  } else if (error instanceof Error) {
    return res.status(500).json({ message: error.message });
  } else {
    return res.status(500).send({ message: "unknown error" });
  }
};
