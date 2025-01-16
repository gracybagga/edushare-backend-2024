const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { getTeacherDashboard } = require("../controllers/teacherController");

const router = express.Router();

router.get("/dashboard", verifyToken, getTeacherDashboard);

module.exports = router;
