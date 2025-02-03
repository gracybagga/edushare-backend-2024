// studentRoutes.js
const express = require("express");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const { getStudentDashboard, accessCourse, getStudentProfile } = require("../controllers/studentController");

const router = express.Router();

// Ensure that only students can access the student dashboard
router.get("/dashboard", verifyToken, verifyRole("student"), getStudentDashboard);

// Access a specific course
router.get("/course/:courseName", verifyToken, accessCourse);

// Get student profile
router.get("/dashboard/profile", verifyToken, verifyRole("student"), getStudentProfile);

module.exports = router;
