import express from "express";
import { getUserLists, test, updateUser } from "../controllers/user.controller.js";
import verifyToken from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.get("/lists/:id", verifyToken, getUserLists);
// router.delete('/delete/:id', verifyToken, deleteUser)

export default router;
// router.post('/update/:id', verifyToken, updateUser)
// router.get('/:id', verifyToken, getUser)
