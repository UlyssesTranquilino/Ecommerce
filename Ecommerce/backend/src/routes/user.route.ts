import express from "express";
const userRouter = express.Router();
import {
  getUserDetailsHandler,
  updateUserDetailsHandler,
  SignInUserHandler,
  SignUpUserHandler,
  addUserWishlistHandler,
  deleteUserWishlistHanlder,
  addUserCartHandler,
  updateUserCartHandler,
  deleteUserCartHandler,
} from "../controllers/user.controller";

userRouter.get("/user/:id", getUserDetailsHandler);
userRouter.put("/user/:id", updateUserDetailsHandler);

//WISHLIST
userRouter.post("/user/wishlist/:id", addUserWishlistHandler);
userRouter.delete("/user/wishlist/:id", deleteUserWishlistHanlder);

//CART
userRouter.post("/user/cart/:id", addUserCartHandler);
userRouter.put("/user/cart/:id", updateUserCartHandler);
userRouter.delete("/user/cart/:id", deleteUserCartHandler);

userRouter.post("/user/signin", SignInUserHandler);
userRouter.post("/user/signup", SignUpUserHandler);

export default userRouter;
