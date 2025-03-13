const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();

// Initialize Gemini AI with API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the model (Update this based on available models)
const MODEL_NAME = "gemini-1.5-pro";  // Change if needed

// AI Chat Endpoint
router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: message }] }],
        });

        const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!responseText) {
            return res.status(500).json({ error: "AI bot error", details: "No response from AI model" });
        }

        res.status(200).json({ response: responseText });

    } catch (error) {
        res.status(500).json({ error: "AI bot error", details: error.message });
    }
});

module.exports = router;
