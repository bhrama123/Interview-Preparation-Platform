const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const progressRoutes = require("./routes/progress");
const quizRoutes = require("./routes/quiz"); // Quiz Results
const quizQuestionRoutes = require("./routes/quizQuestion"); // Random MCQ Questions
const leaderboardRoutes = require("./routes/leaderboard");
const questionRoutes = require("./routes/question");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const quizResultRoutes = require("./routes/quizresult");
const adminRoutes = require("./routes/admin");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);

app.use("/api/quiz", quizRoutes); // Save Quiz Result
app.use("/api/quiz-questions", quizQuestionRoutes); // Get Random Quiz Questions

app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/quizresults", quizResultRoutes);
app.use("/api/admin", adminRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("Interview Preparation Platform API Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});