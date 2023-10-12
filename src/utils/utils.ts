import { NextFunction, Request, Response } from "express";
import { CustomError } from "./customerror";

type ControllerType<T> = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<T>;

export const tryCatch =
  <T>(controller: ControllerType<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error: CustomError | unknown | Error) {
      return next(error);
    }
  };
