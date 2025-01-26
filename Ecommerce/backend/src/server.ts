import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import productRouter from "./routes/product.route"; // Renamed for clarity
import wishlistRouter from "./routes/wishlist.route";
import userRouter from "./routes/user.route";
import path from "path";
import cors from "cors"; // Import CORS middleware

const PORT = process.env.PORT || 5000;
dotenv.config();

const _dirname = path.resolve();
// Create an Express application
const app = express();

// Configure CORS middleware to allow requests from your frontend
const corsOptions = {
  origin: 'https://shop-at-exclusive.netlify.app', // Replace with your frontend's URL
};

app.use(cors(corsOptions)); // Apply CORS middleware globally
app.use(express.json());

// Define routes with proper paths
app.use('/api/products', productRouter); // Use '/api/products' or your desired path
app.use('/api/wishlists', wishlistRouter);
app.use('/api/users', userRouter); 

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at localhost:", PORT);
});
