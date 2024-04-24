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

export const getList = async (req, res, next) => {
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

export const deleteList = async (req, res, next) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== List.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await List.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateList = async (req, res, next) => {
  const list = await List.findById(req.params.id);
  if (!list) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== list.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedList);
  } catch (error) {
    next(error);
  }
};



// export const getLists = async (req, res, next) => {
//   try {
//     const limit = parseInt(req.query.limit) || 9;
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     let offer = req.query.offer;

//     if (offer === undefined || offer === "false") {
//       offer = { $in: [false, true] };
//     }

//     let furnished = req.query.furnished;

//     if (furnished === undefined || furnished === "false") {
//       furnished = { $in: [false, true] };
//     }

//     let parking = req.query.parking;

//     if (parking === undefined || parking === "false") {
//       parking = { $in: [false, true] };
//     }

//     let type = req.query.type;

//     if (type === undefined || type === "all") {
//       type = { $in: ["sale", "rent"] };
//     }

//     const searchTerm = req.query.searchTerm || "";

//     const sort = req.query.sort || "createdAt";

//     const order = req.query.order || "desc";

//     const lists = await List.find({
//       name: { $regex: searchTerm, $options: "i" },
//       offer,
//       furnished,
//       parking,
//       type,
//     })
//       .sort({ [sort]: order })
//       .limit(limit)
//       .skip(startIndex);

//     return res.status(200).json(lists);
//   } catch (error) {
//     next(error);
//   }
// };