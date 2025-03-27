const mongoose = require("mongoose");

// const courseSchema = new mongoose.Schema({
//   name: String,
//   quizzes: [{ id: String, description: String }],
//   lectures: [{ id: String, description: String }],
//   assignments: [{ id: String, description: String }]
// });

// GB 032625
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Course name is required'],
    minlength: [5, 'Course name must be at least 5 characters long'],
    maxlength: [100, 'Course name cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [1000, 'Description cannot exceed 500 characters'],
  },
  image: {
    type: String,
    required: [true, 'Course image is required'],
    minlength: [3, 'Course image must be at least 3 characters long'],
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
    },
  ],
  lectures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecture',
    },
  ],
  assignments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
    },
  ],
  quizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
    },
  ],
  upcomingActivities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UpcomingActivity',
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model("Course", courseSchema);
