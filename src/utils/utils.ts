import { NextFunction, Request, Response } from "express";


type ControllerType<T> = (req: Request, res: Response) => Promise<T>


export const tryCatch = <T>(controller: ControllerType<T>) =>  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      return next(error);
    }
};
