import Router from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { checkoutSuccess, createCheckoutSession } from "../controllers/payment.controller.js";

const router = Router();

router.post("/create-checkout-session", protectRoute , createCheckoutSession);
router.get("/checkout-success", protectRoute, checkoutSuccess );

export default router;