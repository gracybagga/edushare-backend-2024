const express = require('express');
const router = express.Router();
const { enrollStudent, assignTeacher, getAllCoursesForEnrollment } = require('../controllers/enrollmentController');
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");

// POST request for enrolling a student in a course
router.post('/student', verifyToken, verifyRole('STUDENT'), enrollStudent);

// POST request for assigning a course to a teacher
router.post('/teacher', verifyToken, verifyRole('TEACHER'), assignTeacher);

// GET request for all enrollment courses
router.get('/allcourses', verifyToken, getAllCoursesForEnrollment);

module.exports = router;