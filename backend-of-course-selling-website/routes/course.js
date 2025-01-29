const express = require("express");
const courseRouter = express.Router();

courseRouter.post("/purchase", (req, res) => {
  res.json({
    message: "want this course?",
  });
});
courseRouter.post("/preview", (req, res) => {
  res.json({
    message: "all courses",
  });
});

module.exports = {
  courseRouter,
};
