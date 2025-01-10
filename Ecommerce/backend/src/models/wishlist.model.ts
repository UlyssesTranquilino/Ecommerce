import mongoose from "mongoose";

const wishlists = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    _id: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: false,
    },
    model: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    discount: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    ratingCount: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlists);
export default Wishlist;
