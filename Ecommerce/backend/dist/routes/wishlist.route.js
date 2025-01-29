"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishlistRouter = express_1.default.Router();
const wishlist_controller_1 = require("../controllers/wishlist.controller");
wishlistRouter.get("/api/wishlist", wishlist_controller_1.getWishlistsHandler); // Get the products to the wishlist
wishlistRouter.post("/api/wishlist", wishlist_controller_1.addWishlistHandler); // Add a product to the wishlist
exports.default = wishlistRouter;
