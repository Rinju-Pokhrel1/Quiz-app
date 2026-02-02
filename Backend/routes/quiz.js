const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const { ensureAuthenticated, ensureAdmin } = require("../middleware/Auth");
const { generateQuiz } = require("../llm");

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

// Generate quizzes using LLM
router.post("/generate", ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const { topic = "computer&it", type = "MCQ", numQuestions = 5 } = req.body;
    const generatedQuizzes = await generateQuiz(topic, type, numQuestions);

    // Assuming generatedQuizzes is an array of quiz objects
    const savedQuizzes = [];
    for (const q of generatedQuizzes) {
      // Map the generated format to the schema
      // Assuming q has question, options: [a,b,c,d], answer: "a"
      const option1 = q.options[0] || "";
      const option2 = q.options[1] || "";
      const option3 = q.options[2] || "";
      const option4 = q.options[3] || "";
      const ans = q.options.indexOf(q.correct_answer) + 1; // 1-based index

      const newQuiz = new Quiz({ question: q.question, option1, option2, option3, option4, ans });
      await newQuiz.save();
      savedQuizzes.push(newQuiz);
    }

    res.status(201).json({ message: "Quizzes generated and saved successfully", quizzes: savedQuizzes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate quizzes" });
  }
});

module.exports = router;
