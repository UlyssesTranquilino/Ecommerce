//TUTORIAL: https://medium.com/@induwara99/a-step-by-step-guide-to-setting-up-a-node-js-project-with-typescript-6df4481cb335

// Import the 'express' module along with 'Request' and 'Response' types from express
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import router from "./routes/product.route";
import path from "path";
import cors from "cors"; // Import CORS middleware

const PORT = process.env.PORT || 5000;
dotenv.config();

const _dirname = path.resolve();
// Create an Express application
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("", router);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at local host: ", PORT);
});
