// lib/mongodb.js
import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return; // prevent multiple connections

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Promptify", // optional: specify db name explicitly
    });

    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
};

export default connectToDb;
