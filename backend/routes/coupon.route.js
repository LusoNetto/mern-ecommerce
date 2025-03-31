import Router from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js";

const router = Router();
router.get("/", protectRoute, getCoupon);
router.get("/validate", protectRoute, validateCoupon);


export default router;