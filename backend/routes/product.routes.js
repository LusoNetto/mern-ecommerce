import { Router } from "express";
import {
  getRecommendedProducts,
  getProductsByCategory,
  toggleFeaturedProduct,
  getFeaturedProducts,
  getAllProducts,
  createProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/recommendations", getRecommendedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/featured", getFeaturedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;