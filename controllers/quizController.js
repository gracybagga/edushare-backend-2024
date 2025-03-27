const Course = require("../models/Course");  // Import User model
const { generateAIQuiz } = require("../services/quizService"); // Import AI quiz generator

// quizController.js
exports.generateQuiz = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findOne({ _id: courseId });
  
    if (!course || !course.lectures || course.lectures.length === 0) {
      return res.status(404).json({ message: "Lecture not found for quiz generation" });
    }
  
    const quiz = await generateAIQuiz(courseName, course.lectures[0].description);
    res.json({ course: courseName, quiz });
  } catch (error) {
    console.error("Error generating quiz:", error);
    res.status(500).json({ message: "Error generating quiz", error });
  }
};
  
  