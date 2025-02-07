import express from "express";
import { createOrder, getAllOrders } from "../Controller/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);

export default router;
