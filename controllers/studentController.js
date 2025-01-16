exports.getStudentDashboard = (req, res) => {
    res.status(200).json({
      message: "Welcome to the Student Dashboard",
      courses: ["Math", "Science", "English"],
    });
  };
  
  exports.accessCourse = (req, res) => {
    const { courseName } = req.params;
  
    res.status(200).json({
      message: `You have access to the ${courseName} course.`,
    });
  };
  