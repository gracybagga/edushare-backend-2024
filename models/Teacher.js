const mongoose = require("mongoose");

// const TeacherSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   subjectSpecification: { type: String, required: true },
//   educationalQualification: { type: String, required: true },
//   yearsOfExperience: { type: Number, required: true }
// });

// GB 032625
const TeacherSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  qualifications: { type: String, required: true },
  experience: { type: String, required: true },
  street: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  country: {
    type: String,
    default: 'Canada',
    required: true
  },
  zip: {
    type: String,
    required:true
  },
});

module.exports = mongoose.model("Teacher", TeacherSchema);
