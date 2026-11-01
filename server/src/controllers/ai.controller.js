import genAI from "../services/ai.service.js";

export const testAI = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(
      "Give me 5 Java interview questions."
    );

    const response = result.response.text();

    res.status(200).json({
      success: true,
      result: response,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};