const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Function to generate AI-based quiz
async function generateAIQuiz(courseName, lectureDescription) {
  try {
    const prompt = `Generate a quiz based on the following lecture: ${lectureDescription}. The quiz should have multiple-choice questions in the format:
    {
      "Quiz 1": [
        {
          "question": "What is the capital of France?",
          "options": ["Madrid", "Paris", "Berlin", "Rome"],
          "answer": "Paris"
        }
      ]
    }`;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GEMINI_API_KEY}`,
        },
      }
    );

    if (response.data && response.data.candidates) {
      return JSON.parse(response.data.candidates[0].content.parts[0].text);
    } else {
      throw new Error("Invalid AI response");
    }
  } catch (error) {
    console.error("Error generating AI quiz:", error);
    return { error: "Failed to generate quiz" };
  }
}

module.exports = { generateAIQuiz };
