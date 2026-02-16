import mongoose from "mongoose";
import dotenv from "dotenv";

export const DBConnections = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then((res) => {
      console.log("DATABASE connected successfully");
    })
    .catch((err) => {
      console.log("Failed to connect",err ,  err.message);
    });
};
