import express from "express";
import authMiddleware from "../middleware/auth.js";
import { 
    placeOrder, 
    verifyOrder, 
    userOrders,
    listAllOrders,
    updateOrderStatus
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Customer routes
orderRouter.post("/place", authMiddleware, placeOrder);

// Verify route supports both GET (Stripe redirect) and POST (frontend)
orderRouter.route("/verify")
  .get(verifyOrder)
  .post(authMiddleware, verifyOrder);

orderRouter.post("/userorders", authMiddleware, userOrders);

// Admin routes
orderRouter.get("/list", listAllOrders);
orderRouter.patch("/update", updateOrderStatus);
orderRouter.post("/update", updateOrderStatus);

export default orderRouter;
