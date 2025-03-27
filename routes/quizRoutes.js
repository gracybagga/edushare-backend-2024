// quizRoutes.js
const express = require("express");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const { generateQuiz } = require("../controllers/quizController");

const router = express.Router();

// Ensure that only teachers can access the teacher dashboard
router.get("/:courseId", verifyToken, generateQuiz);

module.exports = router;