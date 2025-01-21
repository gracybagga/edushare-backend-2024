const express = require("express");
const { check } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Register Route
router.post(
  "/register",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
    check("role", "Role is required and must be student or teacher").isIn(["student", "teacher"]),
  ],
  registerUser
);

// Login Route
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginUser
);

module.exports = router;
