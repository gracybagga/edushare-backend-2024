const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const bodyParser = require('body-parser');

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const aiRoutes = require("./routes/aiRoutes");
const lectureRoutes = require("./routes/lectureRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const quizRoutes = require("./routes/quizRoutes");

dotenv.config();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",  // Change this to your frontend URL
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form submissions

app.use(cors(corsOptions)); // enable CORS for all handlers

// Headers check
app.use((req, res, next ) => {
  if (req.xhr && req.accepts('application/json')) next();
  else next(createError(406));
});

app.options('*', cors(corsOptions));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/quizzes", quizRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// Basic error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection error:", err));

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
