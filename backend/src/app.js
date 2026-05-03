const express = require("express");
const cors = require("cors");

const app = express();

// 🔥 Middleware
app.use(cors());
app.use(express.json());

const issueRoutes = require("./routes/IssueRoutes");

// mount route
app.use("/api/issues", issueRoutes);

// test route
app.get("/", (req, res) => {
  res.send("CivicSense API working");
});

module.exports = app;