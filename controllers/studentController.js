exports.getStudentDashboard = (req, res) => {
  res.status(200).json({ message: "Welcome to the Student Dashboard" });
};

exports.accessCourse = (req, res) => {
  const { courseName } = req.params;
  res.status(200).json({ message: `You have accessed the ${courseName} course.` });
};
