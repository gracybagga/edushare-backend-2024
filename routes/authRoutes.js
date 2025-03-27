const express = require("express");
// const cors = require("cors"); // GB 032625
const { registerStudent, registerTeacher, loginUser } = require("../controllers/authController");

const router = express.Router();

// router.use(cors()); // GB 032625
router.post("/register/student", registerStudent);
router.post("/register/teacher", registerTeacher);
router.post("/login", loginUser);

module.exports = router;
