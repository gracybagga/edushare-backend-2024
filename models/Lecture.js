const mongoose = require('mongoose');

// const lectureSchema = new mongoose.Schema({
//   courseName: String,  // 'Math', 'Science', or 'History'
//   lectureId: String,   // unique identifier for the lecture
//   description: String, // Lecture description
// });

// GB 032625
const lectureSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course ID is required'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title must be less than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters'],
  }, //guideline for AI for describing lecture note
  }, { timestamps: true }
);

const Lecture = mongoose.model('Lecture', lectureSchema);
module.exports = Lecture;
