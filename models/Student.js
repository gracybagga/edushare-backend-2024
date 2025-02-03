const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  address: {
    street: String,
    province: String,
    country: String,
    zipCode: String,
  }
});

module.exports = mongoose.model("Student", StudentSchema);
