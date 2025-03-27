const Course = require("../models/Course"); 

// assignmentController.js
exports.getAllAssignments = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findOne({ _id: courseId });

    if (!course || !course.assignments || course.assignments.length === 0) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json({ assignments: course.assignments });
  } catch (error) {
    console.error("Error fetching assignment:", error);
    res.status(500).json({ message: "Error fetching assignment", error });
  }
};
  
  