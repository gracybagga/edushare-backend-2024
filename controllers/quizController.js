// GB 032725
const mongoose = require('mongoose'); 
const Quiz = require('../models/Quiz');
const Course = require('../models/Course');

// Create a new quiz
const addNewQuiz = async (req, res, next) => {
    try {
      const { courseId, title, description} = req.body;
      // Input Validation
      if (!courseId || !title || !description) {
        return res.status(400).json({ message: "Missing required fields: courseId, title, and description are mandatory" });
      }
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ message: "Invalid courseId format" });
      }
      if (!/^.{3,100}$/.test(title)) {
        return res.status(400).json({ message: "Title must be 3-100 characters long." });
      }
      if (!/^.{10,500}$/.test(description)) {
        return res.status(400).json({ message: "Description must be 10-500 characters long." });
      }

      const quiz = new Quiz(req.body);
      const savedQuiz = await quiz.save();

      // Update the course document
      await Course.findByIdAndUpdate( { _id: courseId }, { $push: { quizzes: savedQuiz._id } },
      );

      res.status(201).json({data: savedQuiz});
    } catch (err) {
      
      if (err.name === "ValidationError") {
        return res.status(400).json({
          message: "Validation failed",
          errors: Object.values(err.errors).map((e) => e.message),
        });
      }
  
      res.status(500).json({ message: "An unexpected error occurred", error: err.message });
    }
};

// Get quizzes for a course
const getAllQuizzesForCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    if(!courseId) {
      return res.status(400).json({ message: "CourseId is required to fetch all quizzes" });
    }
    // Validate courseId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid courseId format" });
    }
    const quizzes = await Quiz.find({ courseId: courseId });
   
    if (!quizzes || quizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes found for this course" });
    }
    res.status(200).json({data: quizzes});
  } catch (err) {
     res.status(500).json({ message: "An unexpected error occurred", error: err.message });
  }
};

// Get quiz by id
const getQuizById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if(!id) {
      return res.status(400).json({ message: "QuizId is required to fetch quiz." });
    }

    // Validate courseId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid quiz id format" });
    }
    const quiz = await Quiz.find({ _id: id });
    if (!quiz) {
      return res.status(404).json({ message: "No quiz found for this id" });
    }
    res.status(200).json({ data: quiz});
  } catch (err) {  
    res.status(500).json({ message: "An unexpected error occurred", error: err.message });
  }
};

module.exports = { addNewQuiz, getAllQuizzesForCourse, getQuizById };


// const Course = require("../models/Course");  // Import User model
// const { generateAIQuiz } = require("../services/quizService"); // Import AI quiz generator

// // quizController.js
// exports.generateQuiz = async (req, res) => {
//   const { courseId } = req.params;
//   try {
//     const course = await Course.findOne({ _id: courseId });
  
//     if (!course || !course.lectures || course.lectures.length === 0) {
//       return res.status(404).json({ message: "Lecture not found for quiz generation" });
//     }
  
//     const quiz = await generateAIQuiz(courseName, course.lectures[0].description);
//     res.json({ course: courseName, quiz });
//   } catch (error) {
//     console.error("Error generating quiz:", error);
//     res.status(500).json({ message: "Error generating quiz", error });
//   }
// };
  
  