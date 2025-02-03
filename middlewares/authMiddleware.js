// authMiddleware.js
const jwt = require("jsonwebtoken");

// Middleware to verify the token
exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Store the decoded user info in req.user
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

// Middleware to verify user role
exports.verifyRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: `Access denied! You are not authorized to view this page.` });
    }
    next();
  };
};
