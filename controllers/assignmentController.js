// GB 032725
const mongoose = require('mongoose'); // Import mongoose for transactions
const Assignment = require('../models/Assignment');
const Course = require('../models/Course');
const { generateAIAssignment } = require("../services/assignmentService"); // Import AI quiz generator

// Create a new assignment
const createNewAssignment = async (req, res, next) => {
  try {
    const { courseId, title, description } = req.body;   

    // Validate required fields
    if (!title || !courseId || !description) {
      return res.status(400).json({ message: 'Title, Course Id, description are required.' });
    }

    if(!mongoose.Types.ObjectId.isValid(courseId)){
      return res.status(400).json({ message: 'Course Id is not a valid mongoId.' });
    }

    const courseExists = await Course.exists({ _id: courseId });
    if (!courseExists) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    // Regex for length validation
    const titleRegex = /^.{5,100}$/; // 5 to 100 characters

    if (!titleRegex.test(title)) {
      return res.status(400).json({ message: 'Title must be between 5 and 100 characters.', });
    }

    const content = await generateAIAssignment(description);

    // Create a new assignment
    const assignment = new Assignment({
      courseId,
      title,
      description,
      content: content.assignment
    });

    // Save the assignment within the session
    const savedAssignment = await assignment.save();

    // Update the course document
    await Course.findByIdAndUpdate(
      { _id: courseId },
      { $push: { assignments: savedAssignment._id } }
    );

    res.status(201).json({ data: savedAssignment });
    
  } catch (err) {
    if (err.name === 'ValidationError') {
      // Handle Mongoose validation errors
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: 'Validation error', error: errors });
    }

    res.status(500).json({ message: 'Error creating assignment', error: err.message });
  }
};

// Fetch assignment by ID
const getAssignmentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if(!id) {
      return res.status(400).json({ message: 'Assignment ID is required.' });
    }

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid assignment ID.' });
    }

    // Find the assignment
    const assignment = await Assignment.findById({ _id: id });

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found.' });
    }

    // Respond with assignment details and files
    res.status(200).json({ data: assignment });
  } catch (err) {
    console.error('Error fetching assignment by ID:', err);
    res.status(500).json({ message: 'Internal server error.', error: err.message });
  }
};

const getAssignmentByCourseId = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    if(!courseId) {
      return res.status(400).json({ message: 'Assignment courseId is required.' });
    }

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid assignment courseId.' });
    }

    // Find the assignment
    const assignments = await Assignment.find({ courseId: courseId });

    if (!assignments) {
      return res.status(404).json({ message: 'Assignments not found.' });
    }

    // Respond with assignment details and files
    res.status(200).json({ data: assignments });
  } catch (err) {
    console.error('Error fetching assignment by ID:', err);
    res.status(500).json({ message: 'Internal server error.', error: err.message });
  }
};

module.exports = { createNewAssignment, getAssignmentById, getAssignmentByCourseId };

// const Course = require("../models/Course"); 

// // assignmentController.js
// exports.getAllAssignments = async (req, res) => {
//   const { courseId } = req.params;
//   try {
//     const course = await Course.findOne({ _id: courseId });

//     if (!course || !course.assignments || course.assignments.length === 0) {
//       return res.status(404).json({ message: "Assignment not found" });
//     }

//     res.json({ assignments: course.assignments });
//   } catch (error) {
//     console.error("Error fetching assignment:", error);
//     res.status(500).json({ message: "Error fetching assignment", error });
//   }
// };
  
  