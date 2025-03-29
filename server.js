const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser');// GB 032625
const createError = require('http-errors');// GB 032625
const bodyParser = require('body-parser');// GB 032625

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const aiRoutes = require("./routes/aiRoutes");
const lectureRoutes = require("./routes/lectureRoutes");// GB 032625
const assignmentRoutes = require("./routes/assignmentRoutes");// GB 032625
const quizRoutes = require("./routes/quizRoutes");// GB 032625
const courseRoutes = require("./routes/courseRoutes");// GB 032725
const videoRoutes = require("./routes/videoRoutes");// GB 032725
const generateContentRoutes = require("./routes/generateContentRoutes");// GB 032725
const enrollmentRoutes = require("./routes/enrollmentRoutes");// GB 032925

dotenv.config();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",  // Change this to your frontend URL // GB 032625
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',// GB 032625
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};// GB 032625

app.use(cors(corsOptions));// GB 032625

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));// GB 032625
app.use(cookieParser());// GB 032625
app.use(bodyParser.json());// GB 032625
app.use(bodyParser.urlencoded({ extended: true })); // For form submissions // GB 032625

app.use(cors(corsOptions)); // enable CORS for all handlers // GB 032625

// Headers check
app.use((req, res, next ) => {
  if (req.xhr && req.accepts('application/json')) next();
  else next(createError(406));
});// GB 032625

app.options('*', cors(corsOptions));// GB 032625

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/lectures", lectureRoutes);// GB 032625
app.use("/api/assignments", assignmentRoutes);// GB 032625
app.use("/api/quizzes", quizRoutes);// GB 032625
app.use("/api/courses", courseRoutes);// GB 032725
app.use("/api/videos", videoRoutes);// GB 032725
app.use("/api/content", generateContentRoutes);// GB 032725
app.use("/api/enroll", enrollmentRoutes);// GB 032725

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});// GB 032625

// Basic error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});// GB 032625

// Database Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//     .then(() => console.log("Database connected successfully"))
//     .catch((err) => console.error("Database connection error:", err));

// GB 032825
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
