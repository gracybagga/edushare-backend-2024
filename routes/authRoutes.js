const express = require("express");
// const cors = require("cors"); // GB 032625
const { registerStudent, registerTeacher, loginUser, resetPassword } = require("../controllers/authController");

const router = express.Router();

// router.use(cors()); // GB 032625
router.post("/register/student", registerStudent);
router.post("/register/teacher", registerTeacher);
router.post("/login", loginUser);
router.post("/reset/password", resetPassword);

module.exports = router;
