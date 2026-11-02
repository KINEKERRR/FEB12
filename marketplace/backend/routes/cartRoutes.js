import express from "express";
import {
  getCart,
  addToCart,
  updateCart,
  deleteCartItem,
} from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/cart", authMiddleware, getCart);
router.post("/cart", authMiddleware, addToCart);
router.put("/cart", authMiddleware, updateCart);
router.delete("/cart/:productId", authMiddleware, deleteCartItem);

export default router;
