import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    if (!dbUrl) {
      throw new Error("no Url");
    }
    await mongoose.connect(dbUrl);
    const mongo = mongoose.connection;
    mongo.on("error", (error) => console.log(error));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred.");
    }
  }
};
