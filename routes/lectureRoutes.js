// lectureRoutes.js
const express = require("express");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const {addLecture,getLecture,getAllLectures} = require("../controllers/lectureController");

const router = express.Router();


// Add a lecture
router.post("/", verifyToken, verifyRole('TEACHER'), addLecture); // GB 032725 

// Get a specific lecture
router.get("/:id", verifyToken , getLecture); // GB 032725 

// Get all lectures
router.get("/:courseId", verifyToken , getAllLectures); // GB 032725 

module.exports = router;

// // Ensure that only teachers can access the teacher dashboard
// router.get("/:courseId", verifyToken, getAllLectures);
