const {
  findOne,
  findAll,
  create,
  deleteOne: deleteItem,
  updateOne: updateItem,
} = require("./db-service.js");
const asyncHandler = require("express-async-handler");

const getAll = ({ model, populationFields, entity }) => {
  return asyncHandler(async (req, res) => {
    try {
      const allItems = await findAll({
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

const getOne = ({ model, populationFields }) => {
  return asyncHandler(async (req, res) => {
    try {
      const selectedCycle = await findOne({
        id: req.params.id,
        model,
        populationFields,
      });
      res.status(200).json(selectedCycle);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });
};

const createOne = ({ model, requiredKeys = [] }) => {
  return asyncHandler(async (req, res) => {
    const data = req.body;

    if (requiredKeys.length > 0) {
      let missingKeys = [];
      const hasMissingKeys = requiredKeys.reduce((prev, current) => {
        if (Boolean(data[current])) {
          return prev;
        } else {
          missingKeys.push(current);
          return prev + 1;
        }
      }, 0);

      if (Boolean(hasMissingKeys)) {
        return res
          .status(400)
          .json({ message: `missing keys: ${missingKeys.join(", ")}` });
      }
    }
    const newItem = await create(model, data);
    return res.json(newItem);
  });
};

const updateOne = ({model, populationFields}) => {
  return asyncHandler(async (req, res) => {
    const filter = req.params.id;
    console.log(filter);
    const selectedItem = await updateItem({
      model,
      id: req.params.id,
      data: req.body,
      populationFields
    });
    res.json(selectedItem);
  });
};

const deleteOne = (model) => {
  return asyncHandler(async (req, res) => {
    const deletedItem = await deleteItem(model, req.params.id);
    res.json(deletedItem);
  });
};

module.exports = { getAll, getOne, createOne, updateOne, deleteOne };
