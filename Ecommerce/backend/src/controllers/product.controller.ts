import Product from "../models/product.model";
import mongoose from "mongoose";
import { Request, Response } from "express";
export const getProductsHandler = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("ERROR: ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProductHandler = async (req: Request, res: Response) => {
  const product = req.body;

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("ERROR: ", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProductHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("ERROR: ", error);
    res.status(404).json({ success: false, message: "Product Not Found" });
  }
};

export const deleteProductHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.error("ERROR: ", error);
    res.status(404).json({ success: false, message: "Product Not Found" });
  }
};
