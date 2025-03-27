// quizRoutes.js
const express = require("express");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const { getAllAssignments } = require("../controllers/assignmentController");

const router = express.Router();

router.get("/:courseId", verifyToken, getAllAssignments);

module.exports = router;
