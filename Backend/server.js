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

// const express = require("express");
// const connectDB = require("./connect");
// const cors = require("cors");
// const app = express();
// const quiz = require("./routes/quiz");
// const AuthRouters = require("./routes/AuthRouters");
// const bodyParser = require("body-parser")
// const quizSchema = require("./llm");  
// const questionSchema = require("./llm");
// const PORT = process.env.PORT || 5000;
// app.use(cors());
// app.use(express.json());
// require("dotenv").config({ path: __dirname + "/.env" });



// app.get("/", (req, res) => {
//   res.send("Quiz API Running...");
// });


// // Use quiz routes
// app.use("/quizzes", quiz);



// app.use("/auth", AuthRouters);
// all routes in quiz.js will be under /api

// start server after db connect
// const start = async () => {
// try {
//   await connectDB();
//   console.log("MongoDB connected successfully");

//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// } catch (error) {
//   console.error("Error starting server:", error);

// }
//    try {
//     const quiz = await quizSchema.generateQuiz();
//     res.json(quiz);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to generate quiz" });
//   }
// };

// start();


// Backend/server.js
import express from "express";
import connectDB from "./connect.js";
import cors from "cors";
import quizzesRouter from "./routes/quiz.js";
import authRouter from "./routes/AuthRouters.js";
import userroutes from "./routes/userroutes.js";
import adminroute from "./routes/adminroute.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import * as llm from "./llm.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: __dirname + "/.env" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Quiz API Running..."));

// Mount routers
app.use("/quizzes", quizzesRouter);
app.use("/auth", authRouter);
    app.use("/user", userroutes);
    app.use("/admin", adminroute);

// LLM-backed quiz generation endpoint
app.post("/quizzes/generate", async (req, res) => {
  try {
    // optional payload: { topic, difficulty, count }
    const params = req.body || {};
    const generated = await llm.generateQuiz(params);
    return res.json(generated);
  } catch (err) {
    console.error("generateQuiz error:", err);
    return res.status(500).json({ error: "Failed to generate quiz" });
  }
});

// Start server after DB connect
const start = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

start();
