const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

// Register Handle
router.post("/register", async (req, res) => {
  const { name, email, password, password2 } = req.body;
  if (!name || !email || !password || !password2) {
    return res.status(400).json({ msg: "Please fill in all fields" });
  }
  if (password !== password2) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "Email is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ msg: "Authentication error" });
    }
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ msg: "Login error" });
      }

      res.json({
        msg: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        redirectUrl:
          user.role === "admin" ? "/dashboard/admin" : "/dashboard/user",
      });
    });
  })(req, res, next);
});

// Logout Handle
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ msg: "Logout error" });
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ msg: "Session destroy error" });
      }

      res.clearCookie("connect.sid");
      res.json({ msg: "Logout successful" });
    });
  });
});

module.exports = router;
