const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  quizzes: [{ id: String, description: String }],
  lectures: [{ id: String, description: String }],
  assignments: [{ id: String, description: String }]
});

module.exports = mongoose.model("Course", courseSchema);
