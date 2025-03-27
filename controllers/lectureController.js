const Course = require("../models/Course");  // Import User model

// lectureController.js
exports.getAllLectures = async (req, res) => {
  const { courseId } = req.params;
    try {
        const course = await Course.findOne({ _id: courseId });

        if (!course || !course.lectures || course.lectures.length === 0) {
            return res.status(404).json({ message: "Lecture not found" });
        }

        res.json({ lectures: course.lectures });
    } catch (error) {
        console.error("Error fetching lecture:", error);
        res.status(500).json({ message: "Error fetching lecture", error });
    }
};
  
  