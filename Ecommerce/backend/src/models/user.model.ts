import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters long"],
      select: false, // Exclude password from query results by default
    },
    carts: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number, required: true, default: 1 },
        subTotal: { type: Number, required: false, default: 0 },
        model: { type: String, required: false },
        color: { type: String, required: false },
      },
    ],
    wishlists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wishlist",
      },
    ],
    address: {
      type: String,
      required: false,
    },
    profileImg: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next(); // Skip if password is not modified
//   this.password = await bcrypt.hash(this.password, 10); //Hash the password
//   next();
// });

// userSchema.methods.comparePassword = function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password).bind(this);
// };

const User = mongoose.model("User", userSchema);
export default User;
