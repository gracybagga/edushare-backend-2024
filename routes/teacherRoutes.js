// teacherRoutes.js
const express = require("express");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const { getTeacherDashboard, getTeacherProfile } = require("../controllers/teacherController");

const router = express.Router();

// Ensure that only teachers can access the teacher dashboard
router.get("/dashboard/teacher/:userId", verifyToken, verifyRole("TEACHER"), getTeacherDashboard);// GB 032925

// Get teacher profile
router.get("/profile/:userId", verifyToken, verifyRole("TEACHER"), getTeacherProfile);// GB 032925

module.exports = router;
