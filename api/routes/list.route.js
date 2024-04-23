import express from "express";
import verifyToken from "../utils/verifyUser.js";
import { createList, deleteList, getLists } from "../controllers/list.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createList);
router.delete("/delete/:id", verifyToken, deleteList);
// router.post("/update/:id", verifyToken, updateListing);
// router.get("/get/:id", getListing);
// router.get("/get", getListings);

export default router;
