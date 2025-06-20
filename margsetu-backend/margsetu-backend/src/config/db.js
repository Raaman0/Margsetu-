// src/config/db.js

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ [MongoDB Connected] Host: ${conn.connection.host}`);
        console.log(`🗂️  Database Name: ${conn.connection.name}`);
    } catch (error) {
        console.error(`❌ [MongoDB Error] ${error.message}`);
        process.exit(1); // Stop the server on DB failure
    }
};

export default connectDB;
