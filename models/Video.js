// GB 032625
const mongoose = require('mongoose');
const videoSchema = new mongoose.Schema({
    courseId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course', 
        required: [true, "Course ID is required"], 
    },
    title: { 
        type: String, 
        required: [true, "Title is required"],
        maxlength: [200, "Title cannot exceed 100 characters"]
    },
    videoUrl: { 
        type: String,
        required: [true, "Video URL is required"],
    }, //url for youtube video
  }, { timestamps: true }
);
  
module.exports = mongoose.model('Video', videoSchema);