const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();

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
    You are an AI chatbot for EduShare, an advanced educational platform designed to foster collaboration between teachers and students. 
    EduShare enables teachers to create AI-powered quizzes, share study materials. Students can access a variety of educational resources, ask questions, participate in discussions, and receive personalized assistance from the AI.

    Key features of EduShare include:
    1. **AI-powered Quizzes**: Teachers can generate dynamic quizzes with personalized feedback to help students assess their learning.
    2. **Study Materials**: Students learn through AI generated lecture notes.
    3. **Video Lecutres**: There is feature of video lectures for students who learn better through videos.
    4. **Personalized Recommendations**: Based on students' interactions and quiz results, the AI offers tailored resources and suggestions for improvement.
    
    You are expected to answer all questions based on EduShare’s features, purpose, and best practices, ensuring your responses are informative, friendly, and helpful.
    
    Your role is to assist users with navigating the platform, resolving technical issues, and providing insights on how to make the most of EduShare’s tools and resources.
    If you are unsure about any questions, please refer the user to Edushare's customer care.

    Along with instructions above please do help the user in their general questions as well, be they are about some help in studies or some general knowledge.
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

        res.status(200).json({ success:true, response: responseText });

    } catch (error) {
        res.status(500).json({ error: "AI bot error", details: error.message });
    }
});

module.exports = router;
