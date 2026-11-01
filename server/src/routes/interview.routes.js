import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
  createInterview,
  getMyInterviews,
  getInterviewById,
  submitAnswer,
  completeInterview,
} from "../controllers/interview.controller.js";

const router = express.Router();

router.post("/", protect, createInterview);

router.get("/", protect, getMyInterviews);

router.get("/:id", protect, getInterviewById);

router.put("/:id/questions/:questionId/answer", protect, submitAnswer);

router.put("/:id/complete", protect, completeInterview);

export default router;