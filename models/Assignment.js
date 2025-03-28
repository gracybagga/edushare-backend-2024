const mongoose = require('mongoose');

// const assignmentSchema = new mongoose.Schema({
//   courseName: String,  // 'Math', 'Science', or 'History'
//   assignmentId: String, // unique identifier for the assignment
//   description: String,  // Assignment description
// });

// GB 032625
const assignmentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'CourseId is required']
  },
  title: {
    type: String,
    required: [true, 'Assignment title is required'],
    minlength: [5, 'Assignment Title must be at least 5 characters long'],
    maxlength: [100, 'Assignment Title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Assignment description is required'],
    minlength: [5, 'Assignment description must be at least 5 characters long'],
  },
  content: {
    type: String,
    required: [true, 'Assignment content is required'],
  },
}, { timestamps: true });

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;
