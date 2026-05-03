const express = require("express");
const router = express.Router();
const { reportIssue } = require("../controllers/IssueController");
const { getIssues } = require("../controllers/IssueController");
console.log(getIssues);

// base: /api/issues
router.post("/report", reportIssue);

// 🔥 connect route to controller
router.get("/", getIssues);

module.exports = router;