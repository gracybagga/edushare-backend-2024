const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const aiRoutes = require("./routes/aiRoutes");
const { generateAIQuiz } = require("./services/quizService"); // Import AI quiz generator

const Course = require("./models/Course"); // Ensure correct import of the Course model

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:3000",  // Change this to your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware
app.use(express.json());

// Database Connection
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

// ** Fetch lectures from the Course collection **
app.get("/:courseName/lecture", async (req, res) => {
  const { courseName } = req.params;
  try {
    const course = await Course.findOne({ name: courseName });

    if (!course || !course.lectures || course.lectures.length === 0) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    res.json({ lectures: course.lectures });
  } catch (error) {
    console.error("Error fetching lecture:", error);
    res.status(500).json({ message: "Error fetching lecture", error });
  }
});

// ** Fetch assignments from the Course collection **
app.get("/:courseName/assignment", async (req, res) => {
  const { courseName } = req.params;
  try {
    const course = await Course.findOne({ name: courseName });

    if (!course || !course.assignments || course.assignments.length === 0) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json({ assignments: course.assignments });
  } catch (error) {
    console.error("Error fetching assignment:", error);
    res.status(500).json({ message: "Error fetching assignment", error });
  }
});

// ** AI-generated quiz route (fetching lecture and generating quiz) **
app.get("/:courseName/quiz", async (req, res) => {
  const { courseName } = req.params;
  try {
    const course = await Course.findOne({ name: courseName });

    if (!course || !course.lectures || course.lectures.length === 0) {
      return res.status(404).json({ message: "Lecture not found for quiz generation" });
    }

    const quiz = await generateAIQuiz(courseName, course.lectures[0].description);
    res.json({ course: courseName, quiz });
  } catch (error) {
    console.error("Error generating quiz:", error);
    res.status(500).json({ message: "Error generating quiz", error });
  }
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
