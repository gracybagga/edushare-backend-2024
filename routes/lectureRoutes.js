// lectureRoutes.js
const express = require("express");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const { getAllLectures } = require("../controllers/lectureController");

const router = express.Router();

// Ensure that only teachers can access the teacher dashboard
router.get("/:courseId", verifyToken, getAllLectures);

module.exports = router;