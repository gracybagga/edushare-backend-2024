// teacherRoutes.js
const express = require("express");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const { getTeacherDashboard, getTeacherProfile } = require("../controllers/teacherController");

const router = express.Router();

// Ensure that only teachers can access the teacher dashboard
router.get("/dashboard", verifyToken, verifyRole("teacher"), getTeacherDashboard);

// Get teacher profile
router.get("/dashboard/profile", verifyToken, verifyRole("teacher"), getTeacherProfile);

module.exports = router;
