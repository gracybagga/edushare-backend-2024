const express = require("express");

function lectureRoutes(courseName) {
  const router = express.Router();

  router.get("/lecture", (req, res) => {
    res.json({ message: `Lecture for ${courseName}` });
  });

  return router;
}

module.exports = lectureRoutes;
