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
exports.addWishlistHandler = exports.getWishlistsHandler = void 0;
const wishlist_model_1 = __importDefault(require("../models/wishlist.model"));
const getWishlistsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wishlist = yield wishlist_model_1.default.find({});
        res.status(200).json({ success: true, data: wishlist });
    }
    catch (error) {
        console.error("ERROR: ", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});
exports.getWishlistsHandler = getWishlistsHandler;
const addWishlistHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wishlist = req.body;
    const newWishlist = new wishlist_model_1.default(wishlist);
    try {
        yield newWishlist.save();
        res.status(201).json({
            success: true,
            data: newWishlist,
        });
    }
    catch (error) {
        console.error("ERROR: ", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});
exports.addWishlistHandler = addWishlistHandler;
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
