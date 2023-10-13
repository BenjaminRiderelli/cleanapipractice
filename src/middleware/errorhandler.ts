import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customerror";

export const errorHandler = (
  error: Error | CustomError | unknown,
  req:Request,
  res: Response,
  next: NextFunction
) => {
  res.header("Content-Type", 'application/json')
  if (error instanceof CustomError) {
    console.error({
      code: error.errorCode,
      status: error.statusCode,
      message: error.message,
    });
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
