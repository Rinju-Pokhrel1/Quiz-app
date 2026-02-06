import express from "express";
import Quiz from "../models/Quiz.js";
import { ensureAuthenticated, ensureAdmin } from "../middleware/Auth.js";
import { generateQuiz } from "../llm.js";

const router = express.Router();

router.get("/", ensureAuthenticated, async (req, res) => {
  console.log("logged in ", req.user);
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

// Admin routes
router.post("/", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const { question, option1, option2, option3, option4, ans } = req.body;
    const newQuiz = new Quiz({ question, option1, option2, option3, option4, ans });
    await newQuiz.save();
    res.status(201).json({ message: "Quiz created successfully", quiz: newQuiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create quiz" });
  }
});

router.put("/:id", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const { question, option1, option2, option3, option4, ans } = req.body;
    const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, { question, option1, option2, option3, option4, ans }, { new: true });
    if (!updatedQuiz) return res.status(404).json({ error: "Quiz not found" });
    res.json({ message: "Quiz updated successfully", quiz: updatedQuiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update quiz" });
  }
});

router.delete("/:id", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!deletedQuiz) return res.status(404).json({ error: "Quiz not found" });
    res.json({ message: "Quiz deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete quiz" });
  }
});

router.post("/generate", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    // Generate quizzes from LLM
    const generatedQuizzes = await generateQuiz(); // returns [{question, option1..ans}, ...]

    // Save all quizzes at once
    const savedQuizzes = await Quiz.insertMany(generatedQuizzes);

    res.status(201).json({
      message: "Quizzes generated and saved successfully ",
      quizzes: savedQuizzes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate quizzes" });
  }
});

export default router;

