import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      default: "",
    },

    score: {
      type: Number,
      default: 0,
    },

    feedback: {
      type: String,
      default: "",
    },

    strengths: {
      type: String,
      default: "",
    },

    improvements: {
      type: String,
      default: "",
    },

    betterAnswer: {
      type: String,
      default: "",
    },
  },
  {
    _id: true,
  }
);

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      required: true,
    },

    interviewType: {
      type: String,
      enum: ["HR", "Technical", "Mixed"],
      default: "Mixed",
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },

    numberOfQuestions: {
      type: Number,
      default: 10,
    },

    questions: {
      type: [questionSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    score: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Interview", interviewSchema);