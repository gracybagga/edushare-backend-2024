const express = require('express');
const router = express.Router();
const { 
  createNewCourse, 
  getAllCourses, 
  getOneCourse} = require('../controllers/courseController');

// Create a new course
router.post('/', createNewCourse);

// Get all courses
router.get('/', getAllCourses);

// Get a course by ID
router.get('/:id', getOneCourse);

module.exports = router;