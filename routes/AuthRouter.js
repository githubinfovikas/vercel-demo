import express from "express";

import AuthController from "../controllers/AuthController.js";
const router = express();
router.post("/signin", AuthController.signin);
router.post("/signup", AuthController.signup);
router.get("/signout", AuthController.signOut);

export default router;
