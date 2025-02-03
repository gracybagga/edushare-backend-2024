const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subjectSpecification: { type: String, required: true },
  educationalQualification: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true }
});

module.exports = mongoose.model("Teacher", TeacherSchema);
