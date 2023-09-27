import { Document } from "mongoose";
import {
  CreateType,
  DeleteOne,
  FindAllType,
  FindOneType,
  MongoDBModel,
  UpdateOne,
} from "./db-types";
import { CustomError } from "../utils/customerror";
import {
  entityErrCode,
  creatingError,
  missingDataError,
  itemNotFound,
} from "../utils/customerror";

export const findAllItems = <T extends Document>({
  query,
  model,
  populationFields,
  entity,
}: FindAllType<T>): ReturnType<MongoDBModel<T>["find"]> => {
  if (!model || !entity) {
    throw new CustomError(entityErrCode, "entity not found", 404);
  }

  let operation: ReturnType<MongoDBModel<T>["find"]> = model.find(query);

  if (populationFields.length > 0) {
    populationFields.forEach((popString: string) => {
      operation = operation.populate(popString);
    });
  }
  return operation;
};

export const findItem = <T extends Document>({
  id,
  model,
  populationFields,
  entity,
}: FindOneType<T>): ReturnType<MongoDBModel<T>["findById"]> => {
  if (!model || !entity) {
    throw new CustomError(missingDataError, "missing model or entity", 400);
  }
  let operation: ReturnType<MongoDBModel<T>["findById"]> = model.findById(id);

  if (populationFields.length > 0) {
    populationFields.forEach((popField: string) => {
      operation = operation.populate(popField);
    });
  }
  return operation;
};

export const createItem = <T extends Document>({
  model,
  data,
}: CreateType<T>) => {
  if (!model || !data) {
    throw new CustomError(missingDataError, "missing model or entity", 418);
  }
  const newEntity = new model(data);
  return newEntity.save();
};

export const updateItem = <T extends Document>({
  model,
  id,
  data,
  populationFields,
}: UpdateOne<T>) => {
  if (!model || !data || !id) {
    throw new CustomError(missingDataError, "bad request", 400);
  }
  let operation: ReturnType<MongoDBModel<T>["findByIdAndUpdate"]> =
    model.findByIdAndUpdate(id, data, { new: true });
  if (populationFields.length > 0) {
    populationFields.forEach((popField) => {
      operation = operation.populate(popField);
    });
  }
  return operation;
};

export const deleteItem = <T extends Document>({ model, id }: DeleteOne<T>) => {
  if (!model || !id) {
    throw new CustomError(missingDataError, "bad request", 400);
  }
  return model.findByIdAndDelete(id);
};
