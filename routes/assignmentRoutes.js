const express = require("express");

function assignmentRoutes(courseName) {
  const router = express.Router();

  router.get("/assignment", (req, res) => {
    res.json({ message: `Assignment for ${courseName}` });
  });

  return router;
}

module.exports = assignmentRoutes;
