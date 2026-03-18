import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected");
  } catch (error) {
    console.log("Database is Not Connected");
  }
};

export default connectdb;
