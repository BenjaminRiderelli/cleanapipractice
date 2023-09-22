import { Document } from "mongoose";
import {MongoDBModel} from "./db-types"




export type GetAllType<T extends Document> = {
    model:MongoDBModel<T>
    populationFields: string[]
    entity:string
};
