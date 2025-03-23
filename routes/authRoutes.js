const express = require("express");
const { registerStudent, registerTeacher, loginUser } = require("../controllers/authController");

const router = express.Router();

router.use(cors());
router.post("/register/student", registerStudent);
router.post("/register/teacher", registerTeacher);
router.post("/login", loginUser);

module.exports = router;
