import express from "express";
const wishlistRouter = express.Router();

import {
  getWishlistsHandler,
  addWishlistHandler,
  deleteWishlistHandler,
} from "../controllers/wishlist.controller";

wishlistRouter.get("/api/wishlist", getWishlistsHandler); // Get the products to the wishlist
wishlistRouter.post("/api/wishlist", addWishlistHandler); // Add a product to the wishlist
wishlistRouter.delete("/api/wishlist/:id", deleteWishlistHandler); // Delete a product ro the wishlist
export default wishlistRouter;
