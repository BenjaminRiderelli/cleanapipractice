import { Request, Response } from "express";
import asyncHandler from "express-async-handler"

import { GetAllType } from "./crud-types";
import {
  findAllItems,
  findItem,
  createItem,
  updateItem,
  deleteItem,
} from "./db-service";

const getAll = ({ model, populationFields, entity }: GetAllType<any>) => {
  return asyncHandler(async (req: Request, res: Response) => {
    try {
      const allItems = await findAllItems({
        query: req.query,
        populationFields,
        entity,
        model,
      });

      res.status(200).json(allItems);
    } catch (e) {
      res.status(500).json({ message: e });
    }
  });
};
