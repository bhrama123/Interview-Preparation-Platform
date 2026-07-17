const express = require("express");
const mongoose = require("mongoose");

const QuizResult = require("../models/QuizResult");
const QuizQuestion = require("../models/QuizQuestion");

const router = express.Router();


// ======================================
// Get 5 Random Quiz Questions
// ======================================

router.get("/", async (req, res) => {
  try {
    const questions = await QuizQuestion.aggregate([
      { $sample: { size: 5 } }
    ]);

    res.json(questions);

  } catch (err) {
    console.error("GET QUIZ ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});


// ======================================
// Save Quiz Result
// ======================================

router.post("/", async (req, res) => {
  console.log("========== QUIZ POST HIT ==========");
  console.log(req.body);

  return res.json({
    success: true,
    body: req.body,
  });
});

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid userId",
      });
    }

    const quiz = new QuizResult({
      userId,
      score,
      total,
    });

    await quiz.save();

    res.status(201).json({
      success: true,
      message: "Quiz Score Saved Successfully",
      quiz,
    });

  } catch (err) {

    console.error("SAVE QUIZ ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;