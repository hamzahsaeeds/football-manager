const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Team = require("../models/Team");

const router = express.Router();

// Function to generate a team
const generateTeam = () => {
  const positions = {
    Goalkeeper: 3,
    Defender: 6,
    Midfielder: 6,
    Attacker: 5,
  };

  const team = [];
  Object.entries(positions).forEach(([position, count]) => {
    for (let i = 0; i < count; i++) {
      team.push({
        name: `Player ${position} ${i + 1}`,
        position,
        price: Math.floor(Math.random() * 500000), // Random price up to 500K
      });
    }
  });

  return team;
};

// Register or Login
router.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // Register new user
      user = new User({ email, password });
      await user.save();

      // Create team for the new user
      const team = new Team({
        user: user._id,
        players: generateTeam(),
      });

      await team.save();
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
