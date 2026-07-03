const express = require("express");
const Progress = require("../models/Progress");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const leaderboard = await Progress.aggregate([
      {
        $group: {
          _id: "$userId",
          solved: { $sum: 1 },
        },
      },
      {
        $sort: { solved: -1 },
      },
    ]);

    console.log("Leaderboard:", leaderboard);

    const result = [];

    for (const item of leaderboard) {
      console.log("Searching user:", item._id);

      const user = await User.findById(item._id);

      console.log("Found user:", user);

      result.push({
        name: user ? user.name : "Unknown",
        email: user ? user.email : "",
        solved: item.solved,
      });
    }

    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;