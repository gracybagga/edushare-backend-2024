const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const aiRoutes = require("./routes/aiRoutes");
const quizRoutes = require("./routes/quizRoutes");
const lectureRoutes = require("./routes/lectureRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:3000",  // Adjust this to your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Database connected successfully"))
.catch((err) => console.error("Database connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/ai", aiRoutes);

// Call the route functions to get the router objects
app.use("/math", authMiddleware, quizRoutes("Math"));
app.use("/math", lectureRoutes("Math"));
app.use("/math", assignmentRoutes("Math"));

app.use("/science", authMiddleware, quizRoutes("Science"));
app.use("/science", lectureRoutes("Science"));
app.use("/science", assignmentRoutes("Science"));

app.use("/history", authMiddleware, quizRoutes("History"));
app.use("/history", lectureRoutes("History"));
app.use("/history", assignmentRoutes("History"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
