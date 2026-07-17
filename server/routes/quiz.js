const express = require("express");
const mongoose = require("mongoose");
const QuizResult = require("../models/QuizResult");
const QuizQuestion = require("../models/QuizQuestion");

const router = express.Router();

// Get 5 random questions
router.get("/", async (req, res) => {
  try {
    const questions = await QuizQuestion.aggregate([
      { $sample: { size: 5 } }
    ]);

    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Save quiz result
router.post("/", async (req, res) => {
  try {
    const { userId, score, total } = req.body;

    if (!userId || score === undefined || total === undefined) {
      return res.status(400).json({
        message: "userId, score and total are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid userId",
      });
    }

    const quiz = await QuizResult.create({
      userId,
      score,
      total,
    });

    res.status(201).json({
      success: true,
      message: "Quiz Score Saved Successfully",
      quiz,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;