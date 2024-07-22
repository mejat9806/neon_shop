import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables from .env file
dotenv.config();

// Access the MongoDB URI from the environment variables
const mongoURL = process.env.MONGODB_URI;

// Object to track connection status
const connection: any = {};

// Function to connect to MongoDB
export const connectToDb = async () => {
  try {
    // Check if the connection already exists
    if (connection.isConnected) {
      console.log("Connection exists");
      return;
    }

    // Check if mongoURL is undefined
    if (!mongoURL) {
      throw new Error("MongoDB URI is undefined");
    }

    // Connect to MongoDB using the URI from environment variables
    const db = await mongoose.connect(mongoURL);
    mongoose;
    // Set the connection status
    connection.isConnected = db.connections[0].readyState;

    // Log successful connection
    console.log("Connected to MongoDB");
  } catch (error) {
    // Handle connection error
    console.error("Error connecting to MongoDB:", error);
    throw new Error("DB error");
  }
};
