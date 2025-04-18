EduShare Backend Documentation
Overview
EduShare is an e-learning platform with AI integration that facilitates course management, student enrollment, assignment handling, and content delivery. The backend is built with Node.js, Express, and MongoDB, following an MVC architecture pattern.
Tech Stack

Runtime Environment: Node.js
Framework: Express.js (v4.21.2)
Database: MongoDB with Mongoose ORM (v8.9.5)
Authentication: JWT (jsonwebtoken v9.0.2)
Password Hashing: bcrypt.js (v2.4.3)
AI Integration: Google Generative AI (v0.24.0), OpenAI (v4.87.3)
API Client: Axios (v1.8.4)
Other Notable Libraries:

cors (v2.8.5)
dotenv (v16.4.7)
body-parser (v1.20.3)
cookie-parser (v1.4.7)
dialogflow (v4.0.3)



Project Structure
capstone/
├── controllers/             # API logic handlers
│   ├── assignmentController.js
│   ├── authController.js
│   ├── courseController.js
│   ├── enrollmentController.js
│   ├── lectureController.js
│   ├── quizController.js
│   ├── studentController.js
│   ├── teacherController.js
│   └── videoController.js
├── middlewares/             # Express middleware functions
│   └── authMiddleware.js
├── models/                  # Mongoose schemas and models
│   ├── Assignment.js
│   ├── Course.js
│   ├── Lecture.js
│   ├── Quiz.js
│   ├── Student.js
│   ├── Teacher.js
│   ├── UpcomingActivity.js
│   ├── User.js
│   └── Video.js
├── routes/                  # API route definitions
│   ├── aiRoutes.js
│   ├── assignmentRoutes.js
│   ├── authRoutes.js
│   ├── courseRoutes.js
│   ├── enrollmentRoutes.js
│   ├── generateContentRoutes.js
│   ├── lectureRoutes.js
│   ├── quizRoutes.js
│   ├── studentRoutes.js
│   ├── teacherRoutes.js
│   └── videoRoutes.js
├── services/                # Business logic services
│   ├── assignmentService.js
│   ├── lectureService.js
│   └── quizService.js
├── .env                     # Environment variables
├── package.json             # Project dependencies
├── seeder.js                # Database seeding script
└── server.js                # Entry point of the application
Database Models
User
Base model for authentication with role-based access control.
Fields:

email (String, required, unique): User's email address
password (String, required): Hashed password
role (String, enum): User role (student, teacher, admin)
isActive (Boolean): Account status

Student
Represents a student user in the platform.
Fields:

user (ObjectId, ref: 'User'): Reference to the User model
name (String, required): Student's full name
enrolledCourses (Array of ObjectIds, ref: 'Course'): List of courses the student is enrolled in
assignments (Array of ObjectIds, ref: 'Assignment'): Assignments assigned to the student
completedQuizzes (Array of ObjectIds, ref: 'Quiz'): Quizzes completed by the student

Teacher
Represents an instructor/teacher user in the platform.
Fields:

user (ObjectId, ref: 'User'): Reference to the User model
name (String, required): Teacher's full name
expertise (Array of Strings): Areas of expertise
courses (Array of ObjectIds, ref: 'Course'): Courses taught by the teacher

Course
Represents an educational course in the platform.
Fields:

title (String, required): Course title
description (String): Course description
teacher (ObjectId, ref: 'Teacher'): Course instructor
category (String): Course category
duration (Number): Course duration in weeks
level (String, enum): Difficulty level (beginner, intermediate, advanced)
lectures (Array of ObjectIds, ref: 'Lecture'): Course lectures
assignments (Array of ObjectIds, ref: 'Assignment'): Course assignments
videos (Array of ObjectIds, ref: 'Video'): Course videos
quizzes (Array of ObjectIds, ref: 'Quiz'): Course quizzes
enrolledStudents (Array of ObjectIds, ref: 'Student'): Students enrolled in the course
createdAt (Date): Course creation timestamp
updatedAt (Date): Course last update timestamp

Lecture
Represents lecture content within a course.
Fields:

title (String, required): Lecture title
content (String, required): Lecture content
course (ObjectId, ref: 'Course'): Associated course
order (Number): Display order within the course
duration (Number): Estimated duration in minutes
attachments (Array): Additional lecture materials

Video
Represents video content within a course.
Fields:

title (String, required): Video title
description (String): Video description
url (String, required): Video URL or storage path
course (ObjectId, ref: 'Course'): Associated course
duration (Number): Video duration in minutes
order (Number): Display order within the course

Quiz
Represents quizzes or tests within a course.
Fields:

title (String, required): Quiz title
description (String): Quiz description
course (ObjectId, ref: 'Course'): Associated course
questions (Array): Quiz questions with options and correct answers
timeLimit (Number): Time limit in minutes
passingScore (Number): Minimum score to pass

Assignment
Represents course assignments.
Fields:

title (String, required): Assignment title
description (String, required): Assignment instructions
course (ObjectId, ref: 'Course'): Associated course
dueDate (Date): Assignment deadline
maxScore (Number): Maximum achievable score
submissions (Array): Student submissions with scores and feedback

UpcomingActivity
Represents scheduled upcoming activities or events.
Fields:

title (String, required): Activity title
description (String): Activity description
type (String, enum): Activity type (assignment, quiz, lecture, etc.)
date (Date, required): Activity date and time
course (ObjectId, ref: 'Course'): Associated course

API Endpoints
Authentication Routes (/api/auth)

POST /api/auth/register: Register a new user
POST /api/auth/login: Login and receive JWT token
GET /api/auth/logout: Logout and clear auth cookies
GET /api/auth/me: Get current authenticated user profile

Student Routes (/api/student)

GET /api/student: Get all students (admin only)
GET /api/student/:id: Get student by ID
PUT /api/student/:id: Update student profile
DELETE /api/student/:id: Delete student account
GET /api/student/:id/courses: Get student's enrolled courses
GET /api/student/:id/assignments: Get student's assignments

Teacher Routes (/api/teacher)

GET /api/teacher: Get all teachers
GET /api/teacher/:id: Get teacher by ID
PUT /api/teacher/:id: Update teacher profile
DELETE /api/teacher/:id: Delete teacher account
GET /api/teacher/:id/courses: Get courses taught by the teacher

Course Routes (/api/courses)

GET /api/courses: Get all courses
GET /api/courses/:id: Get course by ID
POST /api/courses: Create a new course (teacher only)
PUT /api/courses/:id: Update course (teacher only)
DELETE /api/courses/:id: Delete course (teacher only)
GET /api/courses/:id/lectures: Get course lectures
GET /api/courses/:id/students: Get students enrolled in the course

Lecture Routes (/api/lectures)

GET /api/lectures: Get all lectures
GET /api/lectures/:id: Get lecture by ID
POST /api/lectures: Create a new lecture (teacher only)
PUT /api/lectures/:id: Update lecture (teacher only)
DELETE /api/lectures/:id: Delete lecture (teacher only)

Assignment Routes (/api/assignments)

GET /api/assignments: Get all assignments
GET /api/assignments/:id: Get assignment by ID
POST /api/assignments: Create a new assignment (teacher only)
PUT /api/assignments/:id: Update assignment (teacher only)
DELETE /api/assignments/:id: Delete assignment (teacher only)
POST /api/assignments/:id/submit: Submit assignment solution (student only)
GET /api/assignments/:id/submissions: Get assignment submissions (teacher only)
PUT /api/assignments/:id/grade: Grade assignment submission (teacher only)

Quiz Routes (/api/quizzes)

GET /api/quizzes: Get all quizzes
GET /api/quizzes/:id: Get quiz by ID
POST /api/quizzes: Create a new quiz (teacher only)
PUT /api/quizzes/:id: Update quiz (teacher only)
DELETE /api/quizzes/:id: Delete quiz (teacher only)
POST /api/quizzes/:id/submit: Submit quiz answers (student only)
GET /api/quizzes/:id/results: Get quiz results (teacher only)

Video Routes (/api/videos)

GET /api/videos: Get all videos
GET /api/videos/:id: Get video by ID
POST /api/videos: Upload a new video (teacher only)
PUT /api/videos/:id: Update video (teacher only)
DELETE /api/videos/:id: Delete video (teacher only)

Enrollment Routes (/api/enroll)

POST /api/enroll/:courseId: Enroll in a course (student only)
DELETE /api/enroll/:courseId: Unenroll from a course (student only)
GET /api/enroll/student/:studentId: Get student enrollments

AI Routes (/api/ai)

POST /api/ai/generate-quiz: Generate quiz questions using AI
POST /api/ai/generate-assignment: Generate assignment prompts using AI
POST /api/ai/generate-summary: Generate lecture summary using AI
POST /api/ai/chat: Chat with AI assistant

Content Generation Routes (/api/content)

POST /api/content/generate: Generate educational content using AI
POST /api/content/enhance: Enhance existing content using AI
POST /api/content/simplify: Simplify complex topics using AI

Authentication and Authorization
The application uses JWT (JSON Web Tokens) for authentication. The authMiddleware.js middleware handles token verification and role-based access control.
Token Management

Tokens are issued at login and stored in HTTP-only cookies for security
Token expiration is set to 24 hours by default
The middleware verifies token validity and extracts user information

Role-Based Access Control
The auth middleware supports role verification with functions like:

isAuthenticated: Verifies user is logged in
isTeacher: Verifies user has teacher privileges
isStudent: Verifies user has student privileges
isAdmin: Verifies user has admin privileges

Environment Variables
The application uses the following environment variables that should be configured in the .env file:
PORT=4000
MONGO_URI=mongodb://localhost:27017/eduShare
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
EDUSHARE_FRONTEND_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key
GOOGLE_AI_API_KEY=your_google_ai_api_key
Database Connection
The application connects to MongoDB using Mongoose:
javascriptmongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));
Error Handling
The application implements centralized error handling middleware:
javascriptapp.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});
Server Initialization
The server is initialized in server.js:
javascriptconst PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
Development
Installation
bashnpm install
Running the Server
bash# Production mode
npm start

# Development mode with auto-restart
npm run dev
Database Seeding
bashnode seeder.js
AI Integration
The platform integrates with multiple AI services:

Google Generative AI: Used for content generation and enhancement
OpenAI: Used for interactive AI chat and personalized learning
Dialogflow: Used for conversational interfaces and student support

These integrations enable features like:

Automatic quiz generation
Smart content summarization
AI-powered student assistance
Personalized learning recommendations
Automated grading assistance

Security Considerations

Passwords are hashed using bcrypt before storage
JWTs are stored in HTTP-only cookies to prevent XSS attacks
CORS is configured to allow only the frontend application
Request validation is performed to prevent injection attacks
API requests require proper authentication and authorization
