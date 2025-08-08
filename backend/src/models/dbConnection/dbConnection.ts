import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide DATABASE_URL in the environment variables");
  }
  return await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      throw new Error(
        `DB connection failed: ${(err as Error)?.message || err}`
      );
    });
};

export default dbConnection;
