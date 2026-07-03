const express = require("express");
const User = require("../models/User");
const Question = require("../models/Question");
const Progress = require("../models/Progress");
const QuizResult = require("../models/QuizResult");

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalQuestions = await Question.countDocuments();
    const solvedQuestions = await Progress.countDocuments();
    const totalQuizzes = await QuizResult.countDocuments();

    res.json({
      totalUsers,
      totalQuestions,
      solvedQuestions,
      totalQuizzes,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;