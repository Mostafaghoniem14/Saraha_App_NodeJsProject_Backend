import mongoose, { Schema } from "mongoose";

const userShema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: [3, "username must be at least 3 character"],
      maxLength: [20, "username must be at most 20 character"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "not specified"],
        default: "not specified",
        message: "Gender must be male or female",
      },
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        default: "user",
        message: "role must be USER or ADMIN",
      },
    },
    BOD: String,
    address: String,
    phone: String,
    Image: String,
  },
  { timestamps: true }
);

export const userModel = mongoose.model("User", userShema);
