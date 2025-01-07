//TUTORIAL: https://medium.com/@induwara99/a-step-by-step-guide-to-setting-up-a-node-js-project-with-typescript-6df4481cb335

// Import the 'express' module along with 'Request' and 'Response' types from express
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

// Specify the allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.56.1:5173",
  "http://192.168.1.9:5173",
  "http://192.168.1.5:5173",
  "http://192.168.1.7:5173",
];

// Configure CORS middleware
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("", userRouter);
app.use("", router);
app.use("", wishlistRouter);
app.use("", userRouter);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at localhost:", PORT);
});
