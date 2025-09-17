import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in .env");
}

let isConnected = global.isConnected ?? false; // global cache for dev

export default async function connect() {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "stock",
    });

    isConnected = true;
    global.isConnected = true; // persist across hot reloads
    console.log("✅ DB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
