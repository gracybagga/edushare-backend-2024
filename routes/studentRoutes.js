// studentRoutes.js
const express = require("express");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
// const { getStudentDashboard, accessCourse, getStudentProfile } = require("../controllers/studentController");
const { getStudentDashboard, getStudentProfile } = require("../controllers/studentController");// GB 032925

const router = express.Router();

// Ensure that only students can access the student dashboard
router.get("/dashboard/:userId", verifyToken, verifyRole("STUDENT"), getStudentDashboard);// GB 032925

// Get student profile
router.get("/profile/:userId", verifyToken, verifyRole("STUDENT"), getStudentProfile);// GB 032925

// // Access a specific course
// router.get("/course/:courseId", verifyToken, accessCourse);

module.exports = router;
