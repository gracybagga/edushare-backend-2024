const Student = require('../models/Student');
const Course = require('../models/Course');
const Teacher = require('../models/Teacher');
const mongoose = require('mongoose');

// Enroll student in a course
const enrollStudent = async (req, res) => {
  const { studentId, courseId } = req.body;

  // Validate input
  if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: 'Invalid student or course ID' });
  }

  try {
    // Check if the student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the student is already enrolled in the course
    if (student.coursesEnrolled.includes(courseId) ) {
      return res.status(400).json({ message: 'Student is already enrolled in this course' });
    }

    // Enroll the student in the course
    student.coursesEnrolled.push(courseId);

    await student.save();   

    res.status(200).json({ message: 'Student enrolled successfully', data: student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error enrolling student', error: err.message });
  }
};

// Assign teacher to a course
const assignTeacher = async (req, res) => {
    const { teacherId, courseId } = req.body;
  
    // Validate input
    if (!mongoose.Types.ObjectId.isValid(teacherId) || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid teacher or course ID' });
    }
  
    try {
      // Check if the student exists
      const teacher = await Teacher.findById(teacherId);
      if (!teacher) {
        return res.status(404).json({ message: 'teacher not found' });
      }
  
      // Check if the course exists
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      // Check if the teacher is already enrolled in the course
      if (teacher.coursesAssigned.includes(courseId) ) {
        return res.status(400).json({ message: 'teacher is already enrolled in this course' });
      }
  
      // Enroll the teacher in the course
      teacher.coursesAssigned.push(courseId);

      await teacher.save();   
  
      res.status(200).json({ message: 'teacher enrolled successfully', data: teacher });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error enrolling teacher', error: err.message });
    }
  };

// All courses for enrollment
const getAllCoursesForEnrollment = async (req, res) => {

  try {
    const allCourses = await Course.find();  

    if (!allCourses || allCourses.length === 0) {
      return res.status(404).json({ message: 'Courses for Enrollment not found', data: [] });
    }

    const filteredCourses = allCourses.map(course => ({
      _id: course._id,
      image: course.image,
      title: course.title
    }));

    res.status(200).json({ message: 'Courses for Enrollment successfully fetched', data: filteredCourses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Courses for Enrollment could not be fetched', error: err.message });
  }
};

module.exports = { enrollStudent, assignTeacher, getAllCoursesForEnrollment };