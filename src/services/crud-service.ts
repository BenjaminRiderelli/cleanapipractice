import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { tryCatch } from "../utils/utils";
import {
  CreateOneType,
  GetAllType,
  GetOneType,
  UpdateOneType,
  DeleteOneOneType,
} from "./crud-types";
import {
  createItem,
  deleteItem,
  findAllItems,
  findItem,
  updateItem,
} from "./db-service";
import { CustomError, itemNotFound } from "../utils/customerror";
import {
  entityErrCode,
  creatingError,
  missingDataError,
} from "../utils/customerror";
import { CreateType } from "./db-types";

export const getAll = ({
  model,
  populationFields,
  entity,
}: GetAllType<any>) => {
  return tryCatch(async (req: Request, res: Response) => {
    if (!model || !entity) {
      throw new CustomError(missingDataError, "missing model or entity", 400);
    }
    const allItems = await findAllItems({
      query: req.query,
      populationFields,
      entity,
      model,
    });
    res.status(200).json(allItems);
  });
};

export const getOne = ({
  model,
  populationFields,
  entity,
}: GetOneType<any>) => {
  return tryCatch(async (req, res) => {
    if (!model || !entity) {
      throw new CustomError(missingDataError, "missing model or entity", 400);
    }
    const selectedItem = await findItem({
      id: req.params.id,
      model,
      populationFields,
      entity,
    });
    if (selectedItem === null) {
      throw new CustomError(itemNotFound, "Item not found", 404);
    }
    res.status(200).json(selectedItem);
  });
};

export const createOne = ({ model, requiredKeys }: CreateOneType<any>) => {
  return tryCatch(async (req, res) => {
    const data = req.body;
    console.log(req.body);
    if (requiredKeys.length > 0) {
      let missingKeys: string[] = [];
      const missingKeysCount = requiredKeys.reduce((prev, current) => {
        if (Boolean(data[current])) {
          return prev;
        } else {
          missingKeys.push(current);
          return prev + 1;
        }
      }, 0);

      if (Boolean(missingKeysCount)) {
        throw new CustomError(
          missingDataError,
          `${missingKeysCount} missing keys: ${missingKeys.join(", ")}`,
          400
        );
      }
    }

    const newItem = await createItem({ model, data });
    return res.status(201).json(newItem);
  });
};

export const updateOne = ({ model, populationFields }: UpdateOneType<any>) => {
  return tryCatch(async (req, res) => {
    const id = req.params.id;
    const selectedItem = await updateItem({
      model,
      id: id,
      data: req.body,
      populationFields,
    });
    res.status(200).json(selectedItem);
    9;
  });
};

export const deleteOne = ({ model }: DeleteOneOneType<any>) => {
  return tryCatch(async (req, res) => {
    const deletedItem = await deleteItem({ model, id: req.params.id });
    if (deletedItem === null) {
      throw new CustomError(itemNotFound, "Item not found", 404);
    }

    res.status(200).json(deletedItem);
  });
};
