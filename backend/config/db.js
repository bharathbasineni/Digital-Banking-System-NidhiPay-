const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://bankingsystem:99669966@cluster0.8lk7gn7.mongodb.net/finteova?retryWrites=true&w=majority");
    console.log("MongoDB Atlas Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
