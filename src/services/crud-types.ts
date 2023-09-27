import { Document } from "mongoose";
import { MongoDBModel } from "./db-types";

export type GetAllType<T extends Document> = {
  model: MongoDBModel<T>;
  populationFields: string[];
  entity: string;
};


export type GetOneType<T extends Document> = {
  model: MongoDBModel<T>;
  populationFields: string[];
  entity: string;
};


export type CreateOneType<T extends Document> = {
  model: MongoDBModel<T>;
  requiredKeys: string[];
};

export type UpdateOneType<T extends Document> = {
  model: MongoDBModel<T>;
  populationFields: string[];
};

export type DeleteOneOneType<T extends Document> = {
  model: MongoDBModel<T>;
};
