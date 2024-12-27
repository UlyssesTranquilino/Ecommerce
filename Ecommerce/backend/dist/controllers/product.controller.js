"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductHandler = exports.updateProductHandler = exports.createProductHandler = exports.getSingleProduct = exports.getProductsHandler = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const getProductsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find({});
        res.status(200).json({ success: true, data: products });
    }
    catch (error) {
        console.error("ERROR: ", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});
exports.getProductsHandler = getProductsHandler;
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield product_model_1.default.findById(id);
        res.status(200).json({ success: true, data: product });
    }
    catch (error) {
        console.error("ERROR: ", error);
        res.status(404).json({ success: false, message: "Product Not Found" });
    }
});
exports.getSingleProduct = getSingleProduct;
const createProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    const newProduct = new product_model_1.default(product);
    try {
        yield newProduct.save();
        res.status(201).json({
            success: true,
            data: newProduct,
        });
    }
    catch (error) {
        console.error("ERROR: ", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});
exports.createProductHandler = createProductHandler;
const updateProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = req.body;
    try {
        const updatedProduct = yield product_model_1.default.findByIdAndUpdate(id, product, {
            new: true,
        });
        res.status(200).json({ success: true, data: updatedProduct });
    }
    catch (error) {
        console.error("ERROR: ", error);
        res.status(404).json({ success: false, message: "Product Not Found" });
    }
});
exports.updateProductHandler = updateProductHandler;
const deleteProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield product_model_1.default.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted" });
    }
    catch (error) {
        console.error("ERROR: ", error);
        res.status(404).json({ success: false, message: "Product Not Found" });
    }
});
exports.deleteProductHandler = deleteProductHandler;
