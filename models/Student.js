const mongoose = require("mongoose");

// const StudentSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   gender: { type: String, required: true },
//   dateOfBirth: { type: Date, required: true },
//   address: {
//     street: String,
//     province: String,
//     country: String,
//     zipCode: String,
//   }
// });

// GB 032625
const StudentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
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
  coursesEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

module.exports = mongoose.model("Student", StudentSchema);
