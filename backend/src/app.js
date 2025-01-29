const express = require("express");
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");

const app = express();
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", teamRoutes);

module.exports = app;
