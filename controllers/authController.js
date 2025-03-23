const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

// Register Student
exports.registerStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, confirmPassword, gender, dateOfBirth, street, province, country, zipCode } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ firstName, lastName, email, phoneNumber, password: hashedPassword, role: "student" });
    await newUser.save();

    const newStudent = new Student({ 
      userId: newUser._id, 
      gender, 
      dateOfBirth, 
      address: { street, province, country, zipCode } 
    });
    await newStudent.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Register Teacher
exports.registerTeacher = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, confirmPassword, subjectSpecification, educationalQualification, yearsOfExperience } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ firstName, lastName, email, phoneNumber, password: hashedPassword, role: "teacher" });
    await newUser.save();

    const newTeacher = new Teacher({ 
      userId: newUser._id, 
      subjectSpecification, 
      educationalQualification, 
      yearsOfExperience 
    });
    await newTeacher.save();

    res.status(201).json({ message: "Teacher registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create a payload with additional information (like firstName, lastName, etc.)
    const payload = {
      userId: user._id,
      role: user.role,
      firstName: user.firstName,  // Include additional fields in token
      lastName: user.lastName,
      email: user.email,
      // Add any other relevant fields here
    };

    // Generate a JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token in response
    res.status(200).json({
      message: "Login successful",
      token,
      user: payload
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
