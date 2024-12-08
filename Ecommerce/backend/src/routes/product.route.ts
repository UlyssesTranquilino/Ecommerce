import express from "express";
const router = express.Router();
import {
  getProductsHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../controllers/product.controller";

router.get("/", getProductsHandler); // Get all products
router.post("/", createProductHandler); // Add a new product
router.put("/:id", updateProductHandler); // Update product by ID
router.delete("/:id", deleteProductHandler); // Delete product by ID

export default router;
