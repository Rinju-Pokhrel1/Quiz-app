const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");

router.get("/quizzes", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

module.exports = router;
