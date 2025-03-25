const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_NAME = "gemini-1.5-pro";

async function generateAIQuiz(courseName, lectureDescription) {
    try {
        if (!lectureDescription) {
            return { error: "Lecture description is missing!" };
        }

        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const prompt = `Generate a multiple-choice quiz with 5 questions based on the lecture below for the course "${courseName}":
        Lecture: ${lectureDescription}
        Each question should have 4 options and one correct answer. Return the quiz in a clean JSON format without any markdown formatting.
        Example output:
        {
            "quiz": [
                {
                    "question": "What is ...?",
                    "options": ["A", "B", "C", "D"],
                    "answer": "A"
                }
            ]
        }`;

        const response = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        let quizText = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

        // Remove unnecessary formatting like triple backticks (` ```json `)
        quizText = quizText.replace(/```json|```/g, "").trim(); 

        // Try to parse the response into JSON format
        const quizJSON = JSON.parse(quizText);

        return quizJSON.quiz ? quizJSON : { error: "Invalid quiz format received from AI" };

    } catch (error) {
        console.error("Quiz generation error:", error);
        return { error: "AI Quiz generation failed", details: error.message };
    }
}

module.exports = { generateAIQuiz };
