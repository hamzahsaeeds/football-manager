const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  budget: { type: Number, default: 5000000 },
  players: [
    {
      name: String,
      position: String,
      price: Number,
    },
  ],
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
``;
