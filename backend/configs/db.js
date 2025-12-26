import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/TicketNepal1`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);


    // why exit on failure: If the database connection fails, the application cannot function properly.
    process.exit(1);
  }
};

export default connectDB;