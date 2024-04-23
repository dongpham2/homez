import express from "express";
import verifyToken from "../utils/verifyUser.js";
import { createList, deleteList, getLists, updateList } from "../controllers/list.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createList);
router.delete("/delete/:id", verifyToken, deleteList);
router.post("/update/:id", verifyToken, updateList);
// router.get("/get/:id", getListing);
// router.get("/get", getListings);

export default router;
