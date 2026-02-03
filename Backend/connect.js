//for db connection

// const mongoose = require("mongoose");
// uri="mongodb+srv://rinjup:sC24U2CjYbNZ4qeN@cluster0.8ez4x5j.mongodb.net/?appName=Cluster0"
// const connectDB=()=>
// {
//     console.log("connect db");
//     return mongoose.connect(uri);
// };
// module.exports =connectDB;

const mongoose = require("mongoose");


const uri = "mongodb+srv://rinjup:sC24U2CjYbNZ4qeN@cluster0.8ez4x5j.mongodb.net/quizDB?retryWrites=true&w=majority";

// Function to connect DB
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected ");
  } catch (err) {
    console.error("MongoDB connection failed ", err);
    process.exit(1); // stop server if DB fails
  }
};

module.exports = connectDB;
