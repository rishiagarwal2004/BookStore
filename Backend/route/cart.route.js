import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../controller/cart.controller.js";

const router = express.Router();

router.get("/:userId", getCart);
router.post("/", addToCart);
router.delete("/:userId/:courseId", removeFromCart);
router.delete("/:userId", clearCart);

export default router;
