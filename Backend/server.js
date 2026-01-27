// const express = require("express");
// const connectDB = require("./connect");
// const app = express();

// const PORT = process.env.PORT || 5000;

// app.use(express.json());

// // Test route
// app.get("/", (req, res) => {
//   res.send("Quiz API Running...");
// });

// // Start server and connect to DB
// const start = async () => {
//   try {
//     await connectDB();

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// start();

const express = require("express");
const connectDB = require("./connect");
const cors =require("cors");
const app = express();
const quizRoutes = require("./routes/quiz");
const AuthRouters =require("./routes/AuthRouters");
const bodyParser =require("body-parser")
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
require("dotenv").config();



app.get("/", (req, res) => {
  res.send("Quiz API Running...");
});

// Use quiz routes
app.use("/api", quizRoutes); 
app.use("/auth",AuthRouters);
// all routes in quiz.js will be under /api

// start server after db connect
const start = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  
  }
};

start();

