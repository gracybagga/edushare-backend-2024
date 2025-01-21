const express = require("express");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const { getStudentDashboard, accessCourse } = require("../controllers/studentController");

const router = express.Router();

router.get("/dashboard", verifyToken, verifyRole("student"), getStudentDashboard);
router.get("/course/:courseName", verifyToken, verifyRole("student"), accessCourse);

module.exports = router;
