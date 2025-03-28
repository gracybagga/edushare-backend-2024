// GB 032725  
const mongoose = require('mongoose'); // import mongoose because we will be involving transactions now
const Lecture = require('../models/Lecture');
const Course = require("../models/Course");

const addLecture = async (req, res, next) => {
  try {
    const { courseId, title, description } = req.body;
    // Input validation
    const titleRegex = /^.{3,100}$/; // 3-100 characters
    const descriptionRegex = /^.{10,}$/; // minimum 10 characters

    // Validate input
    if (!courseId || !title || !description) {
      return res.status(400).json({ message: "All fields (courseId, title, description) are required" });
    }
    if (!titleRegex.test(title)) {
      return res.status(400).json({ message: "Title must be 3-100 characters long." });
    }
    if (!descriptionRegex.test(description)) {
      return res.status(400).json({ message: "Description must be at least 10 characters long." });
    }

    // Check if course exists
    const course = await Course.findById({ _id: courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    
    // Create a new lecture
    const lecture = new Lecture({ courseId, title, description });
    const savedLecture = await lecture.save();

    course.lectures.push(savedLecture._id);
    await course.save();
        
    res.status(201).json({data: savedLecture});
  } catch (error) {    
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation failed", error: errors });
    }
    
    res.status(500).json({ message: 'Error creating Lecture', error: error.message });
  }
};

  // Get a specific lecture by ID
const getLecture = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate if ID is provided
    if (!id) {
      return res.status(400).json({ message: 'ID is required to fetch a lecture.' });
    }

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid lecture ID" });
    }

    const lecture = await Lecture.findById({ _id: id });

    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    res.status(200).json({ data: lecture });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving lecture: ', error: err.message });
  }
};

// Get all lectures
const getAllLectures = async (req, res, next) => {
  try {
    const lectures = await Lecture.find();

    if (lectures.length === 0) {
      // Handle the case where no lecture are found
      return res.status(200).json({
        courses: [],
      });
    }

    res.status(200).json({
      data: lectures,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving lectures: ' , error: err.message });
  }
};


module.exports = {addLecture,getLecture,getAllLectures};

// const mongoose = require('mongoose');
// const Course = require("../models/Course");  // Import User model

// // lectureController.js
// const getAllLectures = async (req, res) => {
//   const { courseId } = req.params;
//     try {
//         const course = await Course.findOne({ _id: courseId });

//         if (!course || !course.lectures || course.lectures.length === 0) {
//             return res.status(404).json({ message: "Lecture not found" });
//         }

//         res.json({ lectures: course.lectures });
//     } catch (error) {
//         console.error("Error fetching lecture:", error);
//         res.status(500).json({ message: "Error fetching lecture", error });
//     }
// };

// module.exports = { getAllLectures }