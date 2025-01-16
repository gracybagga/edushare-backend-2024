const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
    check("role", "Role must be either student or teacher").isIn(["student", "teacher"]),
  ],
  registerUser
);

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  loginUser
);

module.exports = router;
