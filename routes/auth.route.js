import express from "express";
import { getMe, login, logout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/myprofile", protectRoute, getMe);
router.post("/register", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
