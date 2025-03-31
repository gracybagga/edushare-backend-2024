// GB 032725
const express = require('express');
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const { addNewQuiz, getAllQuizzesForCourse, getQuizById } = require('../controllers/quizController');

const router = express.Router();
// Create a new quiz
router.post('/',verifyToken, verifyRole('TEACHER'), addNewQuiz);

// Get quizzes for a course
router.get('/quizbycourseid/:courseId', verifyToken, getAllQuizzesForCourse);

// Get quiz by id
router.get('/:id', verifyToken, getQuizById);

module.exports = router;


// // quizRoutes.js
// const express = require("express");
// const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
// const { generateQuiz } = require("../controllers/quizController");

// const router = express.Router();

// // Ensure that only teachers can access the teacher dashboard
// router.get("/:courseId", verifyToken, generateQuiz);

// module.exports = router;