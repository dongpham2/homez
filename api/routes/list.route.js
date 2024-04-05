import express from "express";
import verifyToken from "../utils/verifyUser.js";
import { createList } from "../controllers/list.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createList);

export default router;
