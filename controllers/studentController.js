const mongoose = require("mongoose");// GB 032925
const User = require("../models/User");  // Import User model
const Student = require("../models/Student");  // Import Student model // GB 032925
const Course = require("../models/Course");  // Import Course model // GB 032925

// studentController.js
exports.getStudentDashboard = async (req, res, next) => {
  const userId = req.params.userId;
  if(!userId) {
    return res.status(400).json({message:"Student's userId is required "})
  }
  if(!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({message:"Student's userId is not a valid Mongo Id."})
  }
  try {
    const student = await Student.findOne({userId:userId});
    if(!student) {
      return res.status(400).json({message:"Student not found for the given userId."})
    }
    // Validate coursesEnrolled field
    if (!Array.isArray(student.coursesEnrolled) || student.coursesEnrolled.length === 0) {
      return res.status(200).json({ 
        studentId: student._id, 
        coursesEnrolled: [] 
      });
    }

    // Fetch all courses in parallel
    const courses = await Promise.all(
      student.coursesEnrolled.map(async (courseId) => {
        const course = await Course.findById(courseId);
        return {
          id: course._id,
          name: course.name,
          category: course.category,
          image: course.image,
        };
      })
    );

    // Send response
    return res.status(200).json({
      studentId: student._id,
      coursesEnrolled: courses
    });
    
  } catch (err) {
    console.error('Error fetching student based on the given userId: '+err);
    return res.status(500).json({ message:'Error fetching Student details.', error: err.message });
  }

  };
  
  // GB 032925
  exports.getStudentProfile = async (req, res, next) => {
    const userId = req.params.userId;
    if(!userId) {
      return res.status(400).json({message:"Student's userId is required "})
    }
    if(!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({message:"Student's userId is not a valid Mongo Id."})
    }
    try {
      const student = await Student.findOne({userId:userId});
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json({data : student});
    } catch (err) {
      res.status(404).json({ message:'Student not found', error: err.message });
    }
  };

  // exports.getStudentDashboard = (req, res) => {
  //   // Ensure that the user is a student
  //   if (req.user.role !== "student") {
  //     return res.status(403).json({ message: "Access denied! You are not authorized to view this page." });
  //   }
  
  //   // Respond with student-specific data
  //   res.status(200).json({
  //     message: "Welcome to the Student Dashboard",
  //     student: req.user,  // Including user details (could include courses, etc.)
  //   });
  // };

  // // Example of accessing a course
  // exports.accessCourse = (req, res) => {
  //   // Simulating course access
  //   const courseName = req.params.courseName;
  //   res.status(200).json({
  //     message: `Accessing course: ${courseName}`,
  //   });
  // };

// exports.getStudentProfile = async (req, res) => {
//   // Ensure the user is a student
//   if (req.user.role !== "student") {
//     return res.status(403).json({ message: "Access denied! You are not authorized to view this page." });
//   }

//   try {
//     // Fetch the student details from the database using the userId (from the token)
//     const student = await User.findById(req.user.userId);

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     // Return the full student profile
//     res.status(200).json({
//       message: "Student Profile Data",
//       student: {
//         firstName: student.firstName,
//         lastName: student.lastName,
//         email: student.email,
//         phoneNumber: student.phoneNumber,
//         gender: student.gender,
//         dateOfBirth: student.dateOfBirth,
//         street: student.street,
//         province: student.province,
//         country: student.country,
//         zipCode: student.zipCode
//         ,
//         // Add any other relevant data you want to include here
//       }
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

  