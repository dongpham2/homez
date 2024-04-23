import express from "express";
import verifyToken from "../utils/verifyUser.js";
import { createList, getLists } from "../controllers/list.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createList);
router.get("/getList", getLists);

export default router;
