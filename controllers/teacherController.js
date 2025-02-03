const User = require("../models/User");  // Import User model
// teacherController.js
exports.getTeacherDashboard = (req, res) => {
    // Ensure that the user is a teacher
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Access denied! You are not authorized to view this page." });
    }
  
    // Respond with teacher-specific data
    res.status(200).json({
      message: "Welcome to the Teacher Dashboard",
      teacher: req.user,  // Including teacher details (could include subjects, etc.)
    });
  };
  
  
// teacherController.js


exports.getTeacherProfile = async (req, res) => {
  // Ensure the user is a teacher
  if (req.user.role !== "teacher") {
    return res.status(403).json({ message: "Access denied! You are not authorized to view this page." });
  }

  try {
    // Fetch the teacher details from the database using the userId (from the token)
    const teacher = await User.findById(req.user.userId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Return the full teacher profile
    res.status(200).json({
      message: "Teacher Profile Data",
      teacher: {
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
        phoneNumber: teacher.phoneNumber,
        subjectSpecification: teacher.subjectSpecification,
        educationalQualification: teacher.educationalQualification,
        yearsOfExperience: teacher.yearsOfExperience,
        // Add any other relevant data you want to include here
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

  