const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const mongoose = require("mongoose");

// Register Student
exports.registerStudent = async (req, res) => {
  try {
    // const { firstName, lastName, email, phoneNumber, password, confirmPassword, gender, dateOfBirth, street, province, country, zipCode } = req.body;
    const { firstName, lastName, email, phone, password, confirmPassword, gender, dateOfBirth, street, province, country, zip } = req.body;

    const isSocialUser= false; // this endpoint is for localuser only
    console.log('Received registration request', { firstName, lastName, email });

    // Validation Regex
    const nameRegex = /^[a-zA-Z]{3,50}$/; // Letters only, 3-50 characters
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    const phoneRegex = /^\d{10}$/; // 10-digit phone number
    const zipRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/; // Alphanumeric, 3-10 characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&])(?=.*\d)[A-Za-z\d!@#$&]{6,14}$/;

    // Password: 6-14 chars, at least one lowercase, one uppercase, one special char, and one number

    // Validate input
    if (!firstName || !lastName || !email || !phone || !street || !province || !country || !zip || !dateOfBirth || !gender || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if(password!==confirmPassword){
      return res.status(400).json({message: 'Password and Confirm Password do not match' });
    }

    // Validate firstName
    if (!nameRegex.test(firstName)) {
      return res.status(400).json({ message: 'First Name must be 3-50 characters and can only contain letters' });
    }

    // Validate lastName
    if (!nameRegex.test(lastName)) {
      return res.status(400).json({message: 'Last Name must be 3-50 characters and can only contain letters' });
    }

    // Validate email
    if (!emailRegex.test(email)) {
      return res.status(400).json({message: 'Invalid email format' });
    }

    // Validate phone
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({message: 'Phone number must be a 10-digit number' });
    }

    // Validate zip
    if (!zipRegex.test(zip)) {
      return res.status(400).json({message: 'Invalid zip code format' });
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      return res.status(400).json({message: 'Password must be 6-14 characters long, include at least one lowercase, one uppercase, one special character [!@#$&], and one number' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    let hashedPassword= null;
    if(!isSocialUser){
      console.log('Hashing password');
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const newUser = new User({ email, password: hashedPassword, role: "STUDENT" });
    await newUser.save();

    const newStudent = new Student({ 
      userId: newUser._id,
      firstName,
      lastName,
      email : email.toLowerCase(),
      phone,
      gender, 
      dateOfBirth,
      street,
      province,
      country,
      zip,
      coursesEnrolled: [],
    });
    await newStudent.save();

    res.status(201).json({ message: "Student registered successfully", userId : newUser._id  });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Register Teacher
exports.registerTeacher = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, confirmPassword, subject, qualifications, experience, street, province, country, zip } = req.body;

    // Validation Regex
    const nameRegex = /^[a-zA-Z]{3,50}$/; // Letters only, 3-50 characters
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    const phoneRegex = /^\d{10}$/; // 10-digit phone number
    const zipRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/; // Alphanumeric, 3-10 characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&])(?=.*\d)[A-Za-z\d!@#$&]{6,14}$/;
    // Password: 6-14 chars, at least one lowercase, one uppercase, one special char, and one number

    // Validate input
    if (!firstName || !lastName || !email || !phone || !street || !province || !country || !zip || !subject || !qualifications || !password || !experience) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if(password!==confirmPassword){
      return res.status(400).json({message: 'Password and Confirm Password do not match' });
    }

    // Validate firstName
    if (!nameRegex.test(firstName)) {
      return res.status(400).json({ message: 'First Name must be 3-50 characters and can only contain letters' });
    }

    // Validate lastName
    if (!nameRegex.test(lastName)) {
      return res.status(400).json({message: 'Last Name must be 3-50 characters and can only contain letters' });
    }

    // Validate email
    if (!emailRegex.test(email)) {
      return res.status(400).json({message: 'Invalid email format' });
    }

    // Validate phone
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({message: 'Phone number must be a 10-digit number' });
    }

    // Validate zip
    if (!zipRegex.test(zip)) {
      return res.status(400).json({message: 'Invalid zip code format' });
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      return res.status(400).json({message: 'Password must be 6-14 characters long, include at least one lowercase, one uppercase, one special character [!@#$&], and one number' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword, role: "TEACHER" });
    await newUser.save();

    const newTeacher = new Teacher({ 
      userId: newUser._id,
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      street,
      province,
      country,
      zip,
      coursesAssigned: [],
      subject,
      qualifications,
      experience
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&])(?=.*\d)[A-Za-z\d!@#$&]{6,14}$/;
  // Password: 6-14 chars, at least one lowercase, one uppercase, one special char, and one number

  // Validate input
  if (!email) {
    return res.status(400).json({message: 'Username or email is required' });
  }
  if (!password) {
    return res.status(400).json({message: 'Password is required' });
  }

  // Validate username
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'Email must be entered in a proper format.'
    });
  }
  // Validate password
  if (!passwordRegex.test(password)) {
   return res.status(400).json({
      message: 'Password must be 6-14 characters long, include at least one lowercase, one uppercase, one special character [!@#$&], and one number'
    });
  }

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
    let fullName='';
    let userFirstName = '';
    let userLastName = '';

    if (user.role==='STUDENT') {
      const student = await Student.findOne({ email : email.toLowerCase() });
      if (!student) {
        return res.status(400).json({ message: "Student'fullname not found." });
      }
      userFirstName = student.firstName;
      userLastName = student.lastName;
      fullName = student.firstName + ' ' + student.lastName;
    }

    if (user.role==='TEACHER') {
      const teacher = await Teacher.findOne({ email : email.toLowerCase() });
      if (!teacher) {
        return res.status(400).json({ message: "Teacher'fullname not found." });
      }
      userFirstName = teacher.firstName;
      userLastName = teacher.lastName;
      fullName = teacher.firstName + ' ' + teacher.lastName;
    }

    // Create a payload with additional information (like firstName, lastName, etc.)
    const payload = {
      userId: user._id,
      role: user.role,
      firstName: userFirstName,  // Include additional fields in token
      lastName: userLastName,
      email: user.email,
      fullName: fullName,
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



// Not good anymore 032625 GB
/*
* // Register Student
exports.registerStudent = async (req, res) => {
  try {
    // const { firstName, lastName, email, phoneNumber, password, confirmPassword, gender, dateOfBirth, street, province, country, zipCode } = req.body;
    const { firstName, lastName, email, phone, password, gender, dateOfBirth, street, province, country, zip } = req.body;
    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: "Passwords do not match" });
    // } // frontend takes care of it

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
* */