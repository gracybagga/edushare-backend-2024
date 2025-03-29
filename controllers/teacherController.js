const mongoose = require("mongoose");// GB 032925
const User = require("../models/User");  // Import User model
const Teacher = require("../models/Teacher");  // Import Teacher model // GB 032925
const Course = require("../models/Course");  // Import Course model // GB 032925

// teacherController.js
exports.getTeacherDashboard = async (req, res) => {
  const userId = req.params.userId;
  if(!userId) {
    return res.status(400).json({message:"Teacher's userId is required "})
  }
  if(!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({message:"Teacher's userId is not a valid Mongo Id."})
  }
  try {
    const teacher = await Teacher.findOne({userId:userId});
    if(!teacher) {
      return res.status(400).json({message:"Teacher not found for the given userId."})
    }
    // Validate coursesAssigned field
    if (!Array.isArray(teacher.coursesAssigned) || teacher.coursesAssigned.length === 0) {
      return res.status(200).json({ 
        teacherId: teacher._id, 
        coursesAssigned: [] 
      });
    }

    // Fetch all courses in parallel
    const courses = await Promise.all(
      teacher.coursesAssigned.map(async (courseId) => {
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
      teacherId: teacher._id,
      coursesAssigned: courses
    });
    
  } catch (err) {
    console.error('Error fetching Teacher based on the given userId: '+err);
    return res.status(500).json({ message:'Error fetching Teacher details.', error: err.message });
  }

  };
  
  // GB 032925
  exports.getTeacherProfile = async (req, res) => {
    const userId = req.params.userId;
    if(!userId) {
      return res.status(400).json({message:"Teacher's userId is required "})
    }
    if(!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({message:"Teacher's userId is not a valid Mongo Id."})
    }
    try {
      const teacher = await Teacher.findOne({userId:userId});
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.status(200).json({data : teacher});
    } catch (err) {
      res.status(404).json({ message:'Teacher not found', error: err.message });
    }
  };


// exports.getTeacherDashboard = (req, res) => {
//     // Ensure that the user is a teacher
//     if (req.user.role !== "teacher") {
//       return res.status(403).json({ message: "Access denied! You are not authorized to view this page." });
//     }
  
//     // Respond with teacher-specific data
//     res.status(200).json({
//       message: "Welcome to the Teacher Dashboard",
//       teacher: req.user,  // Including teacher details (could include subjects, etc.)
//     });
//   };
  
  
// // teacherController.js


// exports.getTeacherProfile = async (req, res) => {
//   // Ensure the user is a teacher
//   if (req.user.role !== "teacher") {
//     return res.status(403).json({ message: "Access denied! You are not authorized to view this page." });
//   }

//   try {
//     // Fetch the teacher details from the database using the userId (from the token)
//     const teacher = await User.findById(req.user.userId);

//     if (!teacher) {
//       return res.status(404).json({ message: "Teacher not found" });
//     }

//     // Return the full teacher profile
//     res.status(200).json({
//       message: "Teacher Profile Data",
//       teacher: {
//         firstName: teacher.firstName,
//         lastName: teacher.lastName,
//         email: teacher.email,
//         phoneNumber: teacher.phoneNumber,
//         subjectSpecification: teacher.subjectSpecification,
//         educationalQualification: teacher.educationalQualification,
//         yearsOfExperience: teacher.yearsOfExperience,
//         // Add any other relevant data you want to include here
//       }
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

