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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// import axios from "axios";
// import Product from "../models/product.model"; // Ensure your path is correct
dotenv_1.default.config();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to MongoDB
        yield mongoose_1.default.connect(process.env.MONGO_URI, {});
        console.log("MongoDB connected");
        // Commented-out code for fetching and inserting products
        /*
        // Function to generate random rating and rating count
        function generateRandomRating() {
          const rating = (Math.random() * 5).toFixed(1); // Random rating between 0 and 5
          const ratingCount = Math.floor(Math.random() * 100) + 1; // Random rating count between 1 and 100
          return { rating: parseFloat(rating), ratingCount };
        }
    
        // Fetch products from the FakeStore API
        const response = await axios.get(
          "https://fakestoreapi.in/api/products?limit=150"
        );
        const products = response.data.products;
        console.log("RESPONSE:");
        console.log("products: ", products);
    
        // Modify products by adding random rating and rating count
        const modifiedProducts = products.map((product: any) => {
          const { rating, ratingCount } = generateRandomRating();
          return {
            ...product,
            rating,
            ratingCount,
          };
        });
    
        // Insert the modified products into the MongoDB database
        await Product.insertMany(modifiedProducts);
        console.log("Products inserted successfully");
        */
    }
    catch (error) {
        console.log("Error: ", error.message);
        process.exit(1);
    }
});
exports.default = connectDB;
