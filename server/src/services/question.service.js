import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateInterviewQuestions = async ({
  company,
  role,
  experience,
  interviewType,
  difficulty,
  numberOfQuestions,
}) => {
  const prompt = `
You are an expert interviewer.

Generate ${numberOfQuestions} interview questions for this candidate.

Company: ${company}
Role: ${role}
Experience: ${experience} years
Interview Type: ${interviewType}
Difficulty: ${difficulty}

Requirements:
- Make every question relevant to the role.
- Match the difficulty to the candidate's experience.
- For Technical interviews, focus on technical concepts, programming, databases, problem solving, and role-related technologies.
- For HR interviews, focus on behavioral and situational questions.
- For Mixed interviews, include both technical and behavioral questions.
- Do not provide answers.
- Return ONLY valid JSON.
- Do not use markdown or code fences.

Return exactly this format:

[
  {
    "question": "Question 1"
  },
  {
    "question": "Question 2"
  }
]
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  let text = response.text.trim();

  text = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  const questions = JSON.parse(text);

  return questions;
};
