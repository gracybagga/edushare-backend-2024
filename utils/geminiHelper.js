const axios = require("axios");

async function generateAIQuiz(courseName) {
  const prompt = `Generate a 5-question multiple-choice quiz on ${courseName}. Provide the correct answers too.`;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText",
      {
        prompt: { text: prompt },
      },
      { params: { key: process.env.GEMINI_API_KEY } }
    );

    return response.data;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
}

module.exports = { generateAIQuiz };
