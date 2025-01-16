const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { getStudentDashboard, accessCourse } = require("../controllers/studentController");

const router = express.Router();

router.get("/dashboard", verifyToken, getStudentDashboard);
router.get("/course/:courseName", verifyToken, accessCourse);

module.exports = router;
