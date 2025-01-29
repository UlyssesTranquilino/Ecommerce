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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserCartHandler = exports.updateUserCartHandler = exports.addUserCartHandler = exports.deleteUserWishlistHanlder = exports.addUserWishlistHandler = exports.SignUpUserHandler = exports.SignInUserHandler = exports.updateUserDetailsHandler = exports.getUserDetailsHandler = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = require("jsonwebtoken");
const getUserDetailsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.params.id);
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        console.error("ERROR: ", error);
        res.status(404).json({ success: false, message: "User not found" });
    }
});
exports.getUserDetailsHandler = getUserDetailsHandler;
const updateUserDetailsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("PARAMS: ", req.params);
    const { name, email, password, newPassword } = req.body;
    try {
        const user = yield user_model_1.default.findById(id).select("+password");
        console.log("USER: ", user);
        if (user) {
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (isMatch) {
                // Hash the new password
                const saltRounds = 10;
                const salt = yield bcrypt_1.default.genSalt(saltRounds);
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, salt);
                // Update user fields
                user.password = hashedPassword;
                user.name = name || user.name;
                user.email = email || user.email;
                yield user.save(); // Save updated user directly
                res
                    .status(200)
                    .json({ success: true, message: "User updated!", data: user });
            }
            else {
                res
                    .status(400)
                    .json({ success: false, message: "Current password does not match" });
            }
        }
        else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    }
    catch (error) {
        console.error("ERROR: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.updateUserDetailsHandler = updateUserDetailsHandler;
const SignInUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_model_1.default.findOne({ email }).select("+password");
        if (user) {
            // Verify password
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({
                    name: user.name,
                    email: user.email,
                    id: user._id,
                    wishlists: user.wishlists,
                    carts: user.carts,
                }, "expressoToken" // Replace with a strong secret key
                );
                res.json({ success: true, user: token });
            }
            else {
                res.status(401).json("Invalid credentials");
            }
        }
        else {
            res.status(404).json("User not found");
        }
    }
    catch (error) {
        console.error("ERROR: ", error);
        res.status(500).json({ success: false, user: false });
    }
});
exports.SignInUserHandler = SignInUserHandler;
const SignUpUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { password } = _a, rest = __rest(_a, ["password"]);
        // Generate salt
        const saltRounds = 10; // Adjust as needed
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        // Create user with hashed password
        const user = yield user_model_1.default.create(Object.assign(Object.assign({}, rest), { password: hashedPassword, salt }));
        res.status(201).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create user" });
    }
});
exports.SignUpUserHandler = SignUpUserHandler;
//WISHLIST
const addUserWishlistHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const productID = req.body;
    try {
        const user = yield user_model_1.default.findById(id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        let message;
        console.log("USER: ", user.wishlists);
        // Check if the productID already exists in the wishlist
        const alreadyInWishlist = user.wishlists.includes(productID._id);
        let wishlist;
        if (alreadyInWishlist) {
            // Don't modify wishlist if productID is already present
            wishlist = user.wishlists;
            message = "This item is already in your wishlist.";
        }
        else {
            // Add productID to the wishlist if it's not there
            wishlist = [...user.wishlists, productID];
            message = "Wishlist added successfully.";
        }
        user.wishlists = wishlist;
        yield user.save();
        res.json({ message: message, data: user });
    }
    catch (error) {
        console.error("Error updating wishlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addUserWishlistHandler = addUserWishlistHandler;
const deleteUserWishlistHanlder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const productID = req.body;
    console.log("BACKEND: ", id);
    try {
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.wishlists = user.wishlists.filter((product) => product.toString() !== productID._id);
        // user.wishlists.map((item) => console.log(item));
        yield user.save();
        res.status(200).json({
            message: "Product removed from wishlist",
            wishlist: user.wishlists,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error removing product from wishlist", error });
    }
});
exports.deleteUserWishlistHanlder = deleteUserWishlistHanlder;
const addUserCartHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const productAdded = req.body;
    try {
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Check if the product already exists in the cart
        const existingItem = user.carts.find((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === productAdded._id.toString(); });
        if (existingItem) {
            // If the item exists, update its quantity, model, stock, and color
            const quantity = existingItem.quantity + productAdded.quantity;
            console.log("Quantity: ", quantity);
            existingItem.quantity += productAdded.quantity;
            existingItem.subTotal = productAdded.price * existingItem.quantity;
            existingItem.model = productAdded.model;
            existingItem.color = productAdded.color;
        }
        else {
            // If the item doesn't exist in the cart, add it
            user.carts.push({
                _id: productAdded._id, // Ensure this matches your schema
                quantity: productAdded.quantity,
                subTotal: productAdded.price * productAdded.quantity, // Calculate subtotal
                model: productAdded.model,
                color: productAdded.color,
            });
        }
        yield user.save();
        res.json({ message: "Item added to cart successfully.", data: user });
    }
    catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addUserCartHandler = addUserCartHandler;
const updateUserCartHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cartItem = req.body;
    console.log("CART ITEM : ", cartItem);
    try {
        const user = yield user_model_1.default.findById(id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        user.carts.forEach((item) => {
            var _a;
            if ((_a = item._id) === null || _a === void 0 ? void 0 : _a.equals(cartItem._id)) {
                item.set({
                    quantity: item.quantity + cartItem.quantity <= 0
                        ? 1
                        : item.quantity + cartItem.quantity,
                    model: cartItem.model,
                    subTotal: cartItem.subTotal,
                    color: cartItem.color,
                });
            }
        });
        yield user.save();
        console.log("USER CART: ", user);
        res.json({ message: "Cart updated", data: user });
    }
    catch (error) {
        console.error("Error updating cart: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateUserCartHandler = updateUserCartHandler;
const deleteUserCartHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const productID = req.body;
    try {
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        productID._id.forEach((product) => {
            user.carts.pull({ _id: product });
        });
        yield user.save();
        res.status(200).json({
            message: "Product removed from cart",
            carts: user.carts,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error removing product from wishlist", error });
    }
});
exports.deleteUserCartHandler = deleteUserCartHandler;
