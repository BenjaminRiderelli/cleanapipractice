import { Document, Model } from "mongoose";


export type MongoDBModel<T extends Document> = Model<T>;

export type FindAllType<T extends Document> = {
  query: object;
  model: MongoDBModel<T>;
  populationFields: string[];
  entity: string;
};

export type FindOneType<T extends Document> = {
  id: string;
  model: MongoDBModel<T>;
  populationFields: string[];
  entity: string;
};

export type CreateType<T extends Document> = {
    model:MongoDBModel<T>,
    data:object
}

export type UpdateOne<T extends Document> = {
    id:string
    data: object;
    model: MongoDBModel<T>;
    populationFields: string[];
  };

export type DeleteOne<T extends Document> = {
    id:string,
    model:MongoDBModel<T>
}