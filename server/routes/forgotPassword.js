const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const User = require("../models/User");
const Otp = require("../models/Otp");

const router = express.Router();

// =====================================
// Email Configuration
// =====================================

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log("SMTP Connected");
  }
});

// =====================================
// Forgot Password - Send OTP
// =====================================

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    console.log("==================================");
    console.log("Forgot Password Request");
    console.log("Email:", email);

    console.log("EMAIL ENV:", process.env.EMAIL);
    console.log(
      "PASSWORD EXISTS:",
      process.env.EMAIL_PASSWORD ? "YES" : "NO"
    );

    const user = await User.findOne({ email });

    console.log("User Found:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    console.log("Generated OTP:", otp);

    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      otp,
    });

    console.log("OTP Saved Successfully");

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <h2>Password Reset</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP expires in 5 minutes.</p>
      `,
    });

    console.log("Email Sent Successfully");
    console.log(info);

    res.json({
      message: "OTP Sent Successfully",
    });

  } catch (err) {

    console.log("========== ERROR ==========");
    console.log(err);
    console.log("===========================");

    res.status(500).json({
      message: err.message,
    });
  }
});

// =====================================
// Verify OTP
// =====================================

router.post("/verify-otp", async (req, res) => {
  try {

    const { email, otp } = req.body;

    const record = await Otp.findOne({
      email,
      otp,
    });

    if (!record) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    res.json({
      message: "OTP Verified",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }
});

// =====================================
// Reset Password
// =====================================

router.post("/reset-password", async (req, res) => {
  try {

    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );

    await Otp.deleteMany({
      email,
    });

    res.json({
      message: "Password Updated Successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }
});

module.exports = router;