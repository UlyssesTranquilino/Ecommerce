"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: false,
    },
    model: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    discount: {
        type: Number,
        required: false,
    },
    rating: {
        type: Number,
        required: false,
    },
    ratingCount: {
        type: Number,
        required: false,
    },
}, { timestamps: true });
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
