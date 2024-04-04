import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./env" });
export const mongoDbConnect = async () => {
  try {
    const url = process.env.MONGODB_URL;
    const response = await mongoose.connect(`${url}/give4good`);

    console.log("connection succesfull");
  } catch (error) {
    console.log("connection error", error.message);
  }
};
