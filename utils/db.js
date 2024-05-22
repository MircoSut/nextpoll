import mongoose from "mongoose";

let cachedConnection = null;
export async function connectToMongoDB() {
  if (cachedConnection) {
    console.log("Using cached MongoDB connection");
    return cachedConnection;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    cachedConnection = conn.connection;
    console.log("New MongoDB connection established");
    return cachedConnection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
