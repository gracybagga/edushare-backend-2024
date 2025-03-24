const express = require("express");
const { generateAIQuiz } = require("../utils/geminiHelper");

function quizRoutes(courseName) {
  const router = express.Router();

  router.get("/quiz", async (req, res) => {
    try {
      const quiz = await generateAIQuiz(courseName);
      res.json({ course: courseName, quiz });
    } catch (error) {
      res.status(500).json({ message: "Error generating quiz", error });
    }
  });

  return router;
}

module.exports = quizRoutes;
