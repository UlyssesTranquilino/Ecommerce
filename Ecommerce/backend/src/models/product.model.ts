import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pictures: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      required: false,
    },
    review: {
      type: String,
      required: false,
    },
    numReview: {
      type: Number,
      required: false,
    },
    isStock: {
      type: Boolean,
      required: true,
    },
    colors: {
      type: Array,
      required: false,
    },
    size: {
      type: Array,
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
    },
    isWishlist: {
      type: Boolean,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    shippingInfo: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    discounts: {
      type: Number,
      required: false,
    },
    rating: {
      type: Object,
      required: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
