import Router from "express";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";
import { getAnalyticsAndDailySalesData } from "../controllers/analytics.controller.js";

const router = Router();

router.get("/", protectRoute, adminRoute, getAnalyticsAndDailySalesData)

export default router;