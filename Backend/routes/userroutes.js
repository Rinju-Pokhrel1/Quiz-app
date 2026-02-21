import express from "express";
import { getAssignedQuizzes } from "../controllers/Usercontroller.js";
import { ensureAuthenticated } from "../middleware/Auth.js";

const router = express.Router();

router.get(
  "/assigned-quizzes",
  ensureAuthenticated,
  getAssignedQuizzes
);

export default router;