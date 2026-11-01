import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

try {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: "Give me 5 Java interview questions.",
  });

  console.log("\nGemini Response:\n");
  console.log(response.text);
} catch (error) {
  console.error("\nGemini Error:\n");
  console.error(error);
}