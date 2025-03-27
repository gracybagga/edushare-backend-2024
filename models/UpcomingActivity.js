// GB 032625
const mongoose = require("mongoose");

const upcomingActivitySchema = new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: [true, "Course ID is required"],
        },
        title: {
            type: String,
            required: [true, "Activity title is required"],
            minlength: [5, "Title must be at least 5 characters long"],
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Activity description is required"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("UpcomingActivity", upcomingActivitySchema);