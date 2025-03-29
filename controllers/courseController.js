// GB 032725
const mongoose = require('mongoose'); // Import mongoose
const Course = require('../models/Course');

// Create a new course
const createNewCourse = async (req, res, next) => {
  try {
    const { name, description, image } = req.body;

    // Validate required fields
    if (!name || !description || !image ) {
      return res.status(400).json({ message: 'Name, description, image for course are required.' });
    }

    // Regex for length validation
    const nameRegex = /^.{5,100}$/; // 5 to 100 characters
    const descriptionRegex = /^.{10,1000}$/; // 10 to 1000 characters
    const imageRegex = /^.{3,}$/; // min 3 characters
    
    if (!nameRegex.test(name)) {
      return res.status(400).json({
        message: 'Name must be between 5 and 100 characters.',
      });
    }

    if (!descriptionRegex.test(description)) {
      return res.status(400).json({
        message: 'Description must be between 10 and 1000 characters.',
      });
    }

    if (!imageRegex.test(image)) {
      return res.status(400).json({
        message: 'Name must be atleast 3 characters.',
      });
    }

    // Create a new course
    const course = new Course({
      name,
      description,
      image,
      videos: [],
      lectures: [],
      assignments: [],
      quizzes: [],
      upcomingActivities: []
    });

    // Save the course within the session
    const savedCourse = await course.save();

    res.status(201).json({data: savedCourse});
  } catch (err) {

    if (err.name === 'ValidationError') {
      // Handle Mongoose validation errors
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: 'Validation error', error: errors });
    }

    res.status(500).json({ message: 'Error creating course: ', error: err.message });
  }
};

// Get all courses
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();

    if (courses.length === 0) {
      // Handle the case where no courses are found
      return res.status(200).json({
        courses: [],
      });
    }

    res.status(200).json({
      courses,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving courses: ', error: err.message });
  }
};

// Get a course by ID
const getOneCourse = async (req, res, next) => {
  
  try {
    const { id } = req.params;

    // Validate if ID is provided
    if (!id) {
      return res.status(400).json({ message: 'ID is required to fetch a record.' });
    }

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid course ID format.' });
    }

    // Find the course by ID within the session
    const course = await Course.findById({ _id: id });

    if (!course) {
      return res.status(404).json({
        course: null,
      });
    }

    res.status(200).json({
      data: course,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving course: ', error: err.message });
  }
};
module.exports = { createNewCourse, getAllCourses, getOneCourse};