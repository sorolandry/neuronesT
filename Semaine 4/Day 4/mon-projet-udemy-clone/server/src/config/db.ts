// server/src/config/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string); // Type assertion pour s'assurer que MONGO_URI est une string
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) { // Typage de l'erreur
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;