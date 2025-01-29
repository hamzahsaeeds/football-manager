const express = require("express");
const Team = require("../models/Team");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get user's team
router.get("/team", protect, async (req, res) => {
  try {
    const team = await Team.findOne({ user: req.user._id });

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
