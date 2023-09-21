import { Document, Model, Query } from "mongoose";
import { CustomError } from "../utils/customerror";
import dotenv from "dotenv";
dotenv.config();

const entityErrCode = process.env.ENTITY_NOT_FOUND_ERR || "";

type MongoDBModel<T extends Document> = Model<T>;

type FindAllType<T extends Document> = {
  query: object;
  model: MongoDBModel<T>;
  populationFields: string[];
  entity: string;
};

type FindOneType<T extends Document> = {
  id: string;
  model: MongoDBModel<T>;
  populationFields: string[];
  entity: string;
};

export const findAll = <T extends Document>({
  query,
  model,
  populationFields,
  entity,
}: FindAllType<T>): ReturnType<MongoDBModel<T>["find"]> => {
  if (!model || !entity) {
     throw new Error("Model or entity not found");
  }
  
  let operation: ReturnType<MongoDBModel<T>["find"]> = model.find(query);

  if (populationFields.length > 0) {
    populationFields.forEach((popString: string) => {
      operation = operation.populate(popString);
    });
  }
  return operation;
};

const findOne = <T extends Document>({
  id,
  model,
  populationFields,
  entity,
}: FindOneType<T>): ReturnType<MongoDBModel<T>["findById"]> => {
  if (!model || !entity) {
    throw new CustomError(entityErrCode, "entity not found", 404);
  }
  let operation: ReturnType<MongoDBModel<T>["findById"]> = model.findById(id);

  if (populationFields.length > 0) {
    populationFields.forEach((popField: string) => {
      operation = operation.populate(popField);
    });
  }
  return operation;
};
