const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  courseName: String,  // 'Math', 'Science', or 'History'
  assignmentId: String, // unique identifier for the assignment
  description: String,  // Assignment description
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;
