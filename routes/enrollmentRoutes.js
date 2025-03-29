const express = require('express');
const router = express.Router();
const { enrollStudent, assignTeacher, getAgetAllCoursesForEnrollmentllEnrollmentCourses } = require('../controllers/enrollmentController');

// POST request for enrolling a student in a course
router.post('/student', enrollStudent);

// POST request for assigning a course to a teacher
router.post('/teacher', assignTeacher);

// GET request for all enrollment courses
router.get('/allcourses', getAllCoursesForEnrollment);

module.exports = router;