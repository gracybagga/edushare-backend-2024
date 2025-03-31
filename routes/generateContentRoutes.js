const express = require('express');
const router = express.Router();
const { generateAIQuiz } = require("../services/quizService"); 
const { generateAILecture } = require("../services/lectureService");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");

router.post('/quiz', verifyToken, async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Enter your Topic to generate a quiz!" });
    }
    
    // Send the request to GeminiAI
    const content = await generateAIQuiz(topic);

    return res.status(200).json({quiz: content.quiz });
    
  } catch (error) {
    console.error("Error communicating with GeminiAI:", error);
    return res.status(500).json({success:false, error: "Failed to process your request" });
  }
});


router.post('/lectures', verifyToken, async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      console.log(topic);
      return res.status(400).json({ error: "Enter your Topic to generate a lecture!" });
    }


   // Send the request to GeminiAI
   const content = await generateAILecture(topic);
    // console.log(aiResponse);
    return res.status(200).json({ content: content.lecture });
    

  } catch (error) {
    console.error("Error communicating with GeminiAI:", error);
    return res.status(500).json({ error: "Failed to process your request" });
  }
});
module.exports = router;