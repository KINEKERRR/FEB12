import express from "express";
import { getOrders, createOrder } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/my-orders", authMiddleware, getOrders);
router.post("/my-orders", authMiddleware, createOrder);

export default router;
