const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   phoneNumber: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ["student", "teacher"], required: true }
// });

// GB 032625
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, // Ensures email is stored in lowercase
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: false, // Changed to false for social logins
  },
  role: {
    type: String,
    enum: ['STUDENT', 'TEACHER'],
    default: 'STUDENT',
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
