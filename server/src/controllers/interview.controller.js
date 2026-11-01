import Interview from "../models/Interview.js";
import { generateInterviewQuestions } from "../services/question.service.js";
import ai from "../services/ai.service.js";

export const createInterview = async (req, res) => {
  try {
    const {
      company,
      role,
      experience,
      interviewType,
      difficulty,
      numberOfQuestions,
    } = req.body;

    if (
      !company ||
      !role ||
      experience === undefined ||
      !interviewType ||
      !difficulty ||
      !numberOfQuestions
    ) {
      return res.status(400).json({
        success: false,
        message: "All interview fields are required",
      });
    }

    const questions = await generateInterviewQuestions({
      company,
      role,
      experience,
      interviewType,
      difficulty,
      numberOfQuestions,
    });

    const interview = await Interview.create({
      user: req.user.userId,
      company,
      role,
      experience,
      interviewType,
      difficulty,
      numberOfQuestions,
      questions,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Interview created successfully",
      interview,
    });
  } catch (error) {
    console.error("Create Interview Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      interviews,
    });
  } catch (error) {
    console.error("Get Interviews Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    return res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    console.error("Get Interview By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { answer } = req.body;
    const { id, questionId } = req.params;

    if (!answer || !answer.trim()) {
      return res.status(400).json({
        success: false,
        message: "Answer is required",
      });
    }

    const interview = await Interview.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const question = interview.questions.id(questionId);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    const prompt = `
You are an expert technical interviewer.

Evaluate the candidate's answer to the following interview question.

Question:
${question.question}

Candidate Answer:
${answer}

Return ONLY valid JSON in this exact format:

{
  "score": 0,
  "feedback": "",
  "strengths": "",
  "improvements": "",
  "betterAnswer": ""
}

Rules:
- score must be between 0 and 10
- feedback should briefly explain the overall quality
- strengths should mention what the candidate did well
- improvements should mention what the candidate should improve
- betterAnswer should provide a concise ideal answer
- Do not use markdown
- Return only JSON
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    let evaluationText = response.text.trim();

    evaluationText = evaluationText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const evaluation = JSON.parse(evaluationText);

    if (interview.status === "Pending") {
  interview.status = "In Progress";
}
   question.answer = answer;
   question.score = evaluation.score;
   question.feedback = evaluation.feedback;
   question.strengths = evaluation.strengths;
   question.improvements = evaluation.improvements;
   question.betterAnswer = evaluation.betterAnswer;
   const answeredQuestions = interview.questions.filter(
  (q) => q.answer && q.answer.trim()
);

const totalScore = answeredQuestions.reduce(
  (sum, q) => sum + q.score,
  0
);

interview.score =
  answeredQuestions.length > 0
    ? Math.round(totalScore / answeredQuestions.length)
    : 0;
    await interview.save();

    return res.status(200).json({
      success: true,
      message: "Answer evaluated successfully",
      evaluation,
      interview,
    });
  } catch (error) {
    console.error("Submit Answer Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const completeInterview = async (req, res) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const answeredQuestions = interview.questions.filter(
      (q) => q.answer && q.answer.trim()
    );

    if (answeredQuestions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please answer at least one question before finishing.",
      });
    }

    const totalScore = answeredQuestions.reduce(
      (sum, q) => sum + q.score,
      0
    );

    interview.score = Math.round(
      totalScore / answeredQuestions.length
    );

    interview.status = "Completed";

    await interview.save();

    return res.status(200).json({
      success: true,
      message: "Interview completed successfully",
      interview,
    });
  } catch (error) {
    console.error("Complete Interview Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};