import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`database connected , ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
