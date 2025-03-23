const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware"); // Ensure the user is logged in
const { generateQuiz } = require("../controllers/quizController");

const router = express.Router();

// Route to generate quiz based on AI
router.post("/generate-quiz", verifyToken, generateQuiz);

module.exports = router;
