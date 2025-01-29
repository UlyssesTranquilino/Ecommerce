"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
const user_controller_1 = require("../controllers/user.controller");
userRouter.get("/user/:id", user_controller_1.getUserDetailsHandler);
userRouter.put("/user/:id", user_controller_1.updateUserDetailsHandler);
//WISHLIST
userRouter.post("/user/wishlist/:id", user_controller_1.addUserWishlistHandler);
userRouter.delete("/user/wishlist/:id", user_controller_1.deleteUserWishlistHanlder);
//CART
userRouter.post("/user/cart/:id", user_controller_1.addUserCartHandler);
userRouter.put("/user/cart/:id", user_controller_1.updateUserCartHandler);
userRouter.delete("/user/cart/:id", user_controller_1.deleteUserCartHandler);
userRouter.post("/user/signin", user_controller_1.SignInUserHandler);
userRouter.post("/user/signup", user_controller_1.SignUpUserHandler);
exports.default = userRouter;
