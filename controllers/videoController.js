const mongoose = require("mongoose");
const Video = require("../models/Video");
const Course = require("../models/Course");

// Add a video to a course
const addVideoToCourse = async (req, res, next) => {
  try {
    const { courseId, title, videoUrl } = req.body;

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid Course ID format" });
    }

    if (!title || !videoUrl) {
      return res.status(400).json({ message: "Title and video URL are required" });
    }

    // Create the video document
    const video = new Video({ courseId, title, videoUrl });
    const savedVideo = await video.save();

    // Update the course document
    await Course.findByIdAndUpdate(
      { _id: courseId },
      { $push: { videos: savedVideo._id } },
    );

    res.status(201).json({data:savedVideo });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle Mongoose validation errors
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: 'Validation error', error: errors });
    }

    res.status(500).json({
      message: "An unexpected error occurred",
      error: error.message,
    });
  } 
};

// Get a single video by ID
const getVideo = async (req, res, next) => {
  try {
    const { videoId } = req.params;

    // Validate if ID is provided
    if (!videoId) {
      return res.status(400).json({ message: 'ID is required to fetch a record.' });
    }
    // Validate video ID
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid Video ID format" });
    }

    const video = await Video.findById({_id:videoId});

    if (!video) {
      return res.status(404).json({data: null});
    }

    res.status(200).json({ data: video });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving video: ', error: error.message });
  }
};

// Get all videos for a course
const getAllVideos = async (req, res, next) => {
 try {
    const { courseId } = req.params;

    // Validate course ID
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid Course ID format" });
    }

    const videos = await Video.find({ courseId: courseId });
    
    if (!videos || videos.length === 0) {
      return res.status(404).json({ message: "No videos found for this course" });
    }

    res.status(200).json({ data: videos });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving videos: ', error: error.message });
  }
};

module.exports = { addVideoToCourse, getVideo, getAllVideos};