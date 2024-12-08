import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI as string, {});
  } catch (error) {
    console.log("ERROR: ", (error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
