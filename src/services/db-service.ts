import { Document, Model, Query } from "mongoose";
import { CustomError } from "../utils/customerror";
import dotenv from "dotenv";
dotenv.config();

const entityErrCode = process.env.ENTITY_NOT_FOUND_ERR || "";

// Define a generic type for a MongoDB model class
type MongoDBModel<T extends Document> = Model<T>;
// Define ArgsType as a generic type
type ArgsType<T extends Document> = {
  query: object;
  model: MongoDBModel<T>;
  populationFields: string[];
  entity: string;
};

export const findAll = <T extends Document>({
  query,
  model,
  populationFields = [],
  entity,
}: ArgsType<T>) => {
  if (!model || !entity) {
    throw new CustomError(entityErrCode, "entity not found", 404);
  }
  let operation: Query<T[], T> = model.find(query);
  if (populationFields.length > 0) {
    populationFields.forEach((popString: string) => {
      operation = operation.populate(popString);
    });
  }
  return operation;
};
