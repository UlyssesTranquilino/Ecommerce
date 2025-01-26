import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import router from "./routes/product.route";
import wishlistRouter from "./routes/wishlist.route";
import userRouter from "./routes/user.route";
import path from "path";
import cors from "cors"; // Import CORS middleware

const PORT = process.env.PORT || 5000;
dotenv.config();

const _dirname = path.resolve();
// Create an Express application
const app = express();

// Configure CORS middleware to allow all origins
const corsOptions = {
  origin: "*", // Allow all origins
};

app.use(cors(corsOptions)); // Apply CORS middleware globally
app.use(express.json());
app.use("", userRouter);
app.use("", router);
app.use("", wishlistRouter);
app.use("", userRouter);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at localhost:", PORT);
});
