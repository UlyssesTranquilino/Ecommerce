import mongoose from "mongoose";
import dotenv from "dotenv";
// import axios from "axios";
import Product from "../models/product.model"; // Ensure your path is correct

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri || mongoUri.trim().length === 0) {
      throw new Error(
        "MONGO_URI is not set. Configure it as an environment variable in your deployment environment."
      );
    }

    // Connect to MongoDB
    await mongoose.connect(mongoUri, {});
    console.log("MongoDB connected");

    // const generateRandomRating = () => {
    //   const isHighRating = Math.random() < 0.8; // 80% chance for 4-5 stars
    //   if (isHighRating) {
    //     return (Math.random() * 1 + 4).toFixed(1); // Random rating between 4 and 5
    //   } else {
    //     return (Math.random() * 2 + 2).toFixed(1); // Random rating between 2 and 4
    //   }
    // };

    const products = await Product.find(); // Fetch all products
    for (let product of products) {
      product.stock = Math.floor(Math.random() * 100 + 10);
      await product.save();
    }

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
