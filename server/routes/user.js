const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Get User
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.json(user);

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Update User
router.put("/:id", async (req, res) => {

  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Profile Updated",
      user,
    });

  } catch (err) {

    res.status(500).json({
      message: "Server Error",
    });

  }

});

module.exports = router;