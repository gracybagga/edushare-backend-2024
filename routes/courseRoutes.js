const express = require('express');
const router = express.Router();
const { 
  createNewCourse, 
  getAllCourses, 
  getOneCourse} = require('../controllers/courseController');
  const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");

// Create a new course
router.post('/', createNewCourse);

// Get all courses
router.get('/', verifyToken, getAllCourses);

// Get a course by ID
router.get('/:id', verifyToken, getOneCourse);

module.exports = router;