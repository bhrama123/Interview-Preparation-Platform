const express = require("express");
const QuizQuestion = require("../models/QuizQuestion");

const router = express.Router();

// ===============================
// Get 5 Random Quiz Questions
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
// Add Quiz Question (Admin)
// ===============================
router.post("/", async (req, res) => {
  try {

    const question = await QuizQuestion.create(req.body);

    res.status(201).json({
      message: "Question Added Successfully",
      question,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;