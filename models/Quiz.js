// GB 032625
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course', 
        required: [true, 'Course the quiz corresponds to is required.'] 
    },
    title: { 
        type: String, 
        required: [true, 'Quiz title is required.'],
        match: [/^.{3,100}$/, 'Quiz title should be of 3-100 chars.'], // 3-100 characters

    },
    description: { 
        type: String,
        required: [true, 'Quiz description is required.'],
        match: [/^.{10,1000}$/, 'Quiz description should be of 10-1000 chars.'], // 10-500 characters
    },
  }, { timestamps: true }
);
  
module.exports = mongoose.model('Quiz', quizSchema);