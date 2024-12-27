"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const product_controller_1 = require("../controllers/product.controller");
router.get("/", product_controller_1.getProductsHandler); // Get all products
router.get("/:id", product_controller_1.getSingleProduct);
router.post("/", product_controller_1.createProductHandler); // Add a new product
router.put("/:id", product_controller_1.updateProductHandler); // Update product by ID
router.delete("/:id", product_controller_1.deleteProductHandler); // Delete product by ID
exports.default = router;
