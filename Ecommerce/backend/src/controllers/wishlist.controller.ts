import Wishlist from "../models/wishlist.model";

import mongoose from "mongoose";
import { Request, Response } from "express";
export const getWishlistsHandler = async (req: Request, res: Response) => {
  try {
    const wishlist = await Wishlist.find({});
    res.status(200).json({ success: true, data: wishlist });
  } catch (error) {
    console.error("ERROR: ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const addWishlistHandler = async (req: Request, res: Response) => {
  const wishlist = req.body;

  const newWishlist = new Wishlist(wishlist);
  try {
    await newWishlist.save();
    res.status(201).json({
      success: true,
      data: newWishlist,
    });
  } catch (error) {
    console.error("ERROR: ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteWishlistHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Wishlist.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product Wishlist Deleted" });
  } catch (error) {
    console.error("ERROR: ", error);
    res
      .status(404)
      .json({ success: false, message: "Product Wishlist Not Found" });
  }
};
// export const deleteProductHandler = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     await Product.findByIdAndDelete(id);
//     res.status(200).json({ success: true, message: "Product Deleted" });
//   } catch (error) {
//     console.error("ERROR: ", error);
//     res.status(404).json({ success: false, message: "Product Not Found" });
//   }
// };
