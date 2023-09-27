import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from "../services/crud-service";
import { Example } from "../db/schemas/exampleSchema.schema";

export const getAllExample = getAll({
  model: Example,
  populationFields: [""],
  entity: "Example",
});

export const getOneExample = getOne({
  model: Example,
  populationFields: [""],
  entity: "Example",
});

export const createOneExample = createOne({
  model: Example,
  requiredKeys: ["title"],
});

export const updateOneExample = updateOne({
  model: Example,
  populationFields: [""],
});

export const deleteOneExample = deleteOne({ model: Example });
