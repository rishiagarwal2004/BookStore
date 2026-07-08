import express from "express";
import {
  getEnrollments,
  checkout,
  updateProgress,
} from "../controller/enrollment.controller.js";

const router = express.Router();

router.get("/:userId", getEnrollments);
router.post("/checkout", checkout);
router.patch("/:userId/:courseId", updateProgress);

export default router;
