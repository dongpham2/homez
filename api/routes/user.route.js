import express from "express";
import { getUser, getUserLists, test, updateUser } from "../controllers/user.controller.js";
import verifyToken from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.get("/lists/:id", verifyToken, getUserLists);
router.get("/:id", verifyToken, getUser);

export default router;
