const express = require("express");
const QuizResult = require("../models/QuizResult");

const router = express.Router();


// =====================================
// Save Quiz Result
// =====================================

router.post("/", async (req, res) => {
  try {

    const { userId, score, total } = req.body;

    const result = new QuizResult({
      userId,
      score,
      total,
    });

    await result.save();

    res.status(201).json({
      message: "Quiz Result Saved",
      result,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
});


// =====================================
// Get User Quiz History
// =====================================

router.get("/:userId", async (req, res) => {

  try {

    const results = await QuizResult.find({
      userId: req.params.userId,
    }).sort({
      createdAt: -1,
    });

    res.json(results);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

});


// =====================================
// Get Quiz Statistics
// =====================================

router.get("/stats/:userId", async (req, res) => {

  try {

    const results = await QuizResult.find({
      userId: req.params.userId,
    });

    let totalQuiz = results.length;
    let totalMarks = 0;
    let totalQuestions = 0;

    results.forEach((quiz) => {

      totalMarks += quiz.score;
      totalQuestions += quiz.total;

    });

    const accuracy =
      totalQuestions === 0
        ? 0
        : Math.round((totalMarks / totalQuestions) * 100);

    res.json({
      totalQuiz,
      totalMarks,
      totalQuestions,
      accuracy,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

});

module.exports = router;