const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();

// Enable CORS
router.use(cors());

// Initialize Gemini AI with API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the model (Update this based on available models)
const MODEL_NAME = "gemini-1.5-pro";  // Ensure this model is available

// AI Chat Endpoint
router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // EduShare context for AI responses
        const context = `
            You are an AI chatbot for EduShare, an educational platform where teachers and students collaborate.
            EduShare allows users to generate AI-powered quizzes, share study materials, and engage in discussions.
            Answer all questions based on EduShare's features and purpose.
        `;

        const fullPrompt = `${context}\n\nUser: ${message}\nAI:`;

        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: fullPrompt }] }],  
        });

        let responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No Response From AI";

        // Remove unwanted characters (curly braces, backslashes, extra spaces)
        responseText = responseText.replace(/[\{\}\\]/g, "").trim();

        if (!responseText) {
            return res.status(500).json({ error: "AI bot error", details: "No response from AI model" });
        }

        res.status(200).json({ response: responseText });

    } catch (error) {
        res.status(500).json({ error: "AI bot error", details: error.message });
    }
});

module.exports = router;
