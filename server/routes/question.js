const express = require("express");
const Question = require("../models/Question");

const router = express.Router();

// ==========================
// Get All Questions
// ==========================
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// ==========================
// Add Question
// ==========================
router.post("/", async (req, res) => {
  try {
    const {
      title,
      topic,
      difficulty,
      company,
      link,
    } = req.body;

    const question = new Question({
      title,
      topic,
      difficulty,
      company,
      link,
    });

    await question.save();

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

// ==========================
// Update Question
// ==========================
router.put("/:id", async (req, res) => {
  try {
    const {
      title,
      topic,
      difficulty,
      company,
      link,
    } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      {
        title,
        topic,
        difficulty,
        company,
        link,
      },
      {
        new: true,
      }
    );

    if (!updatedQuestion) {
      return res.status(404).json({
        message: "Question Not Found",
      });
    }

    res.json({
      message: "Question Updated Successfully",
      updatedQuestion,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// ==========================
// Delete Question
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(
      req.params.id
    );

    if (!deletedQuestion) {
      return res.status(404).json({
        message: "Question Not Found",
      });
    }

    res.json({
      message: "Question Deleted Successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;