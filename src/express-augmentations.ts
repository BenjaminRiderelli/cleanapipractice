import { JwtPayload } from "./middleware/types";
declare module 'express' {
    interface Request {
      jwtPayload?: JwtPayload;
    }
  }