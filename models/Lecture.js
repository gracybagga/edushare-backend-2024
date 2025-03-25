const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  courseName: String,  // 'Math', 'Science', or 'History'
  lectureId: String,   // unique identifier for the lecture
  description: String, // Lecture description
});

const Lecture = mongoose.model('Lecture', lectureSchema);
module.exports = Lecture;
