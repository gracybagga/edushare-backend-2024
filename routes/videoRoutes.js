// GB 032725 
const express = require("express");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const router = express.Router();
const { 
  addVideoToCourse, 
  getVideo, 
  getAllVideos
} = require('../controllers/videoController');

// Add a video to a course
router.post("/" , verifyToken, verifyRole('TEACHER'), addVideoToCourse); 

// Get a single video by ID
router.get("/:videoId", verifyToken , getVideo);

// Get all videos for a course
router.get("/allpercourse/:courseId", verifyToken , getAllVideos);


module.exports = router;