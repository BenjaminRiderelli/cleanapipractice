 import dotenv from "dotenv"
 dotenv.config()
 
 export class CustomError extends Error {
  errorCode: string;
  statusCode: number;
  constructor(errorCode: string, message: string, statusCode: number) {
    super(message);
    this.errorCode = errorCode.toString();
    this.name = "CustomError";
    this.statusCode = statusCode;
    this.stack= ""
  }
}

/*CUSTOM ERRORR CODES*/

export const entityErrCode = process.env.ENTITY_NOT_FOUND_ERR || "";
export const creatingError = process.env.CREATION_ERROR || "";
export const missingDataError = process.env.MISSING_DATA || "";
export const itemNotFound = process.env.ITEM_NOT_FOUND || "";
export const unauthorizedCode = process.env.UNAUTHORIZED || "401";