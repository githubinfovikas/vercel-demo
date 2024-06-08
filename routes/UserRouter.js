import express from "express";
import userController from "../controllers/UserController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/:id", userController.getUserByEmail);
router.post("/", userController.createUser);
router.put("/update/:id", verifyToken, userController.updateUser);
router.put("/:email", userController.updateUser);
router.delete("/:email", userController.deleteUser);

export default router;
