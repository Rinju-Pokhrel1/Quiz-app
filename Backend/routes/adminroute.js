import express from "express";
import { assignQuizToUser } from "../controllers/Admincontroller.js";
import { ensureAuthenticated, ensureAdmin } from "../middleware/Auth.js";

const router = express.Router();

router.post("/assign-quiz", ensureAuthenticated, ensureAdmin, assignQuizToUser);

export default router;