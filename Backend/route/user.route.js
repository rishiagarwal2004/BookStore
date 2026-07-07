import express from "express";
import { signup, login ,sendOtp} from "../controller/user.controller.js";
const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/signup", signup);
router.post("/login", login);

export default router;