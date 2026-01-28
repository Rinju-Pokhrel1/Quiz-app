const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const ensureAuthenticated = require("../middleware/Auth");
router.get("/", ensureAuthenticated, async (req, res) => {
  console.log("logged in ", req.user); // <- fixed
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

module.exports = router;
