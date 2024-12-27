import mongoose from "mongoose";
import dotenv from "dotenv";
// import axios from "axios";
// import Product from "../models/product.model"; // Ensure your path is correct

dotenv.config();

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI as string, {});
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
  } catch (error) {
    console.log("Error: ", (error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
