const express = require("express");
const Progress = require("../models/Progress");
const QuizResult = require("../models/QuizResult");

const router = express.Router();


// ==========================
// Save Solved Question
// ==========================

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      questionId,
      title,
      topic,
      difficulty,
    } = req.body;

    const exists = await Progress.findOne({
      userId,
      questionId,
    });

    if (exists) {
      return res.status(400).json({
        message: "Question already solved",
      });
    }

    const progress = new Progress({
      userId,
      questionId,
      title,
      topic,
      difficulty,
    });

    await progress.save();

    res.status(201).json({
      message: "Progress Saved",
      progress,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// ==========================
// Dashboard Statistics
// ==========================

router.get("/stats/:userId", async (req, res) => {

  try {

    const { userId } = req.params;

    // Total Solved Questions
    const solved = await Progress.countDocuments({
      userId,
    });

    // Quiz Results
    const quizzes = await QuizResult.find({
      userId,
    });

    let totalQuestions = 0;
    let totalCorrect = 0;

    quizzes.forEach((quiz) => {

      totalQuestions += quiz.totalQuestions || 0;
      totalCorrect += quiz.score || 0;

    });

    const accuracy =
      totalQuestions === 0
        ? 0
        : Math.round((totalCorrect / totalQuestions) * 100);

    // Leaderboard Rank
    const leaderboard = await Progress.aggregate([
      {
        $group: {
          _id: "$userId",
          solved: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          solved: -1,
        },
      },
    ]);

    let rank = "-";

    leaderboard.forEach((item, index) => {

      if (item._id == userId) {
        rank = index + 1;
      }

    });

    res.json({
      solved,
      accuracy,
      rank,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

});


// ==========================
// Get User Progress
// ==========================

router.get("/:userId", async (req, res) => {

  try {

    const progress = await Progress.find({
      userId: req.params.userId,
    });

    res.json(progress);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

});


// ==========================
// Delete Solved Question
// ==========================

router.delete("/:id", async (req, res) => {

  try {

    await Progress.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted Successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

});

module.exports = router;