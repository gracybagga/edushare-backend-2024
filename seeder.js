require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("./models/Course");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Database connection error:", err));

const seedData = async () => {
  const courses = [
    {
      name: "Math",
      lectures: [{ id: "math-lecture-1", description: "Introduction to Algebra" }],
      assignments: [{ id: "math-assignment-1", description: "Solve quadratic equations" }]
    },
    {
      name: "Science",
      lectures: [{ id: "science-lecture-1", description: "Basics of Physics" }],
      assignments: [{ id: "science-assignment-1", description: "Write about Newton's Laws" }]
    },
    {
      name: "History",
      lectures: [{ id: "history-lecture-1", description: "Ancient Civilizations Overview" }],
      assignments: [{ id: "history-assignment-1", description: "Describe the Renaissance" }]
    }
  ];

  await Course.deleteMany({});
  await Course.insertMany(courses);
  console.log("Database seeded successfully");
  mongoose.connection.close();
};

seedData();
