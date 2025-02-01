import User from "../models/user.model";
import bcrypt from "bcryptjs";
import mongoose, { Schema, Document } from "mongoose";
import { Request, Response } from "express";
const jwt = require("jsonwebtoken");

export const getUserDetailsHandler = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("ERROR: ", error);
    res.status(404).json({ success: false, message: "User not found" });
  }
};

export const updateUserDetailsHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("PARAMS: ", req.params);
  const { name, email, password, newPassword } = req.body;

  try {
    const user = await User.findById(id).select("+password");

    console.log("USER: ", user);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        // Hash the new password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user fields
        user.password = hashedPassword;
        user.name = name || user.name;
        user.email = email || user.email;

        await user.save(); // Save updated user directly

        res
          .status(200)
          .json({ success: true, message: "User updated!", data: user });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Current password does not match" });
      }
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("ERROR: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const SignInUserHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (user) {
      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = jwt.sign(
          {
            name: user.name,
            email: user.email,
            id: user._id,
            wishlists: user.wishlists,
            carts: user.carts,
          },
          "expressoToken" // Replace with a strong secret key
        );

        res.json({ success: true, user: token });
      } else {
        res.status(401).json("Invalid credentials");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("ERROR: ", error);

    res.status(500).json({ success: false, user: false });
  }
};

export const SignUpUserHandler = async (req: Request, res: Response) => {
  try {
    const { password, ...rest } = req.body;

    // Generate salt
    const saltRounds = 10; // Adjust as needed
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with hashed password
    const user = await User.create({
      ...rest,
      password: hashedPassword,
      salt,
      isAdmin: false,
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
};
//WISHLIST
export const addUserWishlistHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const productID = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    let message;
    console.log("USER: ", user.wishlists);

    // Check if the productID already exists in the wishlist
    const alreadyInWishlist = user.wishlists.includes(productID._id);

    let wishlist;
    if (alreadyInWishlist) {
      // Don't modify wishlist if productID is already present
      wishlist = user.wishlists;
      message = "This item is already in your wishlist.";
    } else {
      // Add productID to the wishlist if it's not there
      wishlist = [...user.wishlists, productID];
      message = "Wishlist added successfully.";
    }

    user.wishlists = wishlist;
    await user.save();

    res.json({ message: message, data: user });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUserWishlistHanlder = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const productID = req.body;

  console.log("BACKEND: ", id);

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wishlists = user.wishlists.filter(
      (product) => product.toString() !== productID._id
    );

    // user.wishlists.map((item) => console.log(item));

    await user.save();
    res.status(200).json({
      message: "Product removed from wishlist",
      wishlist: user.wishlists,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing product from wishlist", error });
  }
};

export const addUserCartHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const productAdded = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product already exists in the cart
    const existingItem = user.carts.find(
      (item) => item._id?.toString() === productAdded._id.toString()
    );

    if (existingItem) {
      // If the item exists, update its quantity, model, stock, and color
      const quantity = existingItem.quantity + productAdded.quantity;
      console.log("Quantity: ", quantity);
      existingItem.quantity += productAdded.quantity;
      existingItem.subTotal = productAdded.price * existingItem.quantity;
      existingItem.model = productAdded.model;
      existingItem.color = productAdded.color;
    } else {
      // If the item doesn't exist in the cart, add it
      user.carts.push({
        _id: productAdded._id, // Ensure this matches your schema
        quantity: productAdded.quantity,
        subTotal: productAdded.price * productAdded.quantity, // Calculate subtotal
        model: productAdded.model,
        color: productAdded.color,
      });
    }

    await user.save();
    res.json({ message: "Item added to cart successfully.", data: user });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserCartHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const cartItem = req.body;
  console.log("CART ITEM : ", cartItem);

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.carts.forEach((item) => {
      if (item._id?.equals(cartItem._id)) {
        item.set({
          quantity:
            item.quantity + cartItem.quantity <= 0
              ? 1
              : item.quantity + cartItem.quantity,
          model: cartItem.model,
          subTotal: cartItem.subTotal,
          color: cartItem.color,
        });
      }
    });

    await user.save();
    console.log("USER CART: ", user);
    res.json({ message: "Cart updated", data: user });
  } catch (error) {
    console.error("Error updating cart: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUserCartHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const productID = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    productID._id.forEach((product: string) => {
      user.carts.pull({ _id: product });
    });

    await user.save();
    res.status(200).json({
      message: "Product removed from cart",
      carts: user.carts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing product from wishlist", error });
  }
};
