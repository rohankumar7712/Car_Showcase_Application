const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

router.get("/admin", ensureAuthenticated, (req, res) => {
  if (req.user?.role === "admin") {
    res.json({ msg: "Admin dashboard access granted", user: req.user });
  } else {
    res.status(403).json({ msg: "Unauthorized" });
  }
});

router.get("/user", ensureAuthenticated, (req, res) => {
  if (req.user?.role === "user") {
    res.json({ msg: "User dashboard access granted", user: req.user });
  } else {
    res.status(403).json({ msg: "Unauthorized" });
  }
});

module.exports = router;
