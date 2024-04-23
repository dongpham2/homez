import List from "../model/List.model.js";
import { errorHandler } from "../utils/error.js";

export const createList = async (req, res, next) => {
  try {
    const list = await List.create(req.body);
    return res.status(201).json(list);
  } catch (error) {
    next(error);
  }
};

export const getLists = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};