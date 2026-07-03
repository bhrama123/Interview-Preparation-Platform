const express = require("express");

const QuizResult = require("../models/QuizResult");
const QuizQuestion = require("../models/QuizQuestion");
const router = express.Router();


// ===============================
// Get 5 Random Questions
// ===============================

router.get("/", async (req, res) => {
  try {

    const questions = await QuizQuestion.aggregate([
  { $sample: { size: 5 } }
]);

    res.json(questions);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
});


// ===============================
// Save Quiz Result
// ===============================

router.post("/", async (req, res) => {
  try {

    const quiz = await QuizResult.create(req.body);

    res.status(201).json({
      message: "Quiz Score Saved",
      quiz,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
});

module.exports = router;