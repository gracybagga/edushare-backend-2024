// quizRoutes.js
const express = require("express");
const router = express.Router();
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const { 
    createNewAssignment, 
    getAssignmentById,
    getAssignmentByCourseId 
} = require('../controllers/assignmentController'); // GB 032725
  
// Add an assignment with file upload
router.post("/" , createNewAssignment); // GB 032725
  
// Serve assignment
router.get("/:id", verifyToken , getAssignmentById); // GB 032725

router.get("/:courseId", verifyToken , getAssignmentByCourseId); // GB 032725

module.exports = router;

//router.get("/:courseId", verifyToken, getAllAssignments);