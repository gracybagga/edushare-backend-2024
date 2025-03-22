// models.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Assignment Schema
const AssignmentSchema = new Schema({
  assignmentId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Course Schema
const CourseSchema = new Schema({
  courseId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    id: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  assignments: [{
    type: Schema.Types.ObjectId,
    ref: 'Assignment'
  }],
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to update the updatedAt field
CourseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

AssignmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create models from schemas
const Course = mongoose.model('Course', CourseSchema);
const Assignment = mongoose.model('Assignment', AssignmentSchema);

module.exports = {
  Course,
  Assignment
};