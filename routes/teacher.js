const express = require("express");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const { getTeacherDashboard } = require("../controllers/teacherController");

const router = express.Router();

router.get("/dashboard", verifyToken, verifyRole("teacher"), getTeacherDashboard);

module.exports = router;
