import { Response, Request, NextFunction } from "express";

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export type JwtPayload = {
  id: string,
  email: string,
  iat: number,
  iss: string
}

interface CustomRequest extends Request {
  jwtPayload?: JwtPayload;
}

export type JwtMiddlewareType = {
  req: CustomRequest;
  res: Response;
  next: NextFunction;
};

export type JwtVerifier = {
  callback: () => void;
  token: string;
};
