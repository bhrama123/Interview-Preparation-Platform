const express = require("express");
const User = require("../models/User");
const Progress = require("../models/Progress");
const QuizResult = require("../models/QuizResult");

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    const solvedQuestions = await Progress.countDocuments({
      userId: req.params.userId,
    });

    const quizzes = await QuizResult.find({
      userId: req.params.userId,
    });

    let bestScore = 0;

    quizzes.forEach((q) => {
      if (q.score > bestScore) {
        bestScore = q.score;
      }
    });

    res.json({
      name: user.name,
      email: user.email,
      solvedQuestions,
      bestScore,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;