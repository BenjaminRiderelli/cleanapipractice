import { Request } from "express";

declare namespace Express {
    interface Request {
      jwtPayload?: object;
    }
  }