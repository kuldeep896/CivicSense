const express = require("express");
const router = express.Router();
const { reportIssue } = require("../controllers/IssueController");
const { getIssues } = require("../controllers/IssueController");
const upload = require("../middlewares/upload");

router.post("/report", upload.single("image"), reportIssue);

// 🔥 connect route to controller
router.get("/", getIssues);

module.exports = router;