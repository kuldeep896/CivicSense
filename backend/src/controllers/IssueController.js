const Issue = require('../models/Issue');
const { calculatePriority } = require('../services/priorityService');

exports.reportIssue = async (req, res) => {
  try {
    console.log('BODY:', req.body);
    const { title, description, category, lat, lng, severity } = req.body;

    // basic validation
    if (!title || !lat || !lng || !severity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

 const issue = new Issue({
  title,
  description,
  category,
  location: {
    type: 'Point',
    coordinates: [lng, lat], // 🔥 IMPORTANT (lng first)
  },
  severity,
});

    // priority compute
    issue.priorityScore = calculatePriority(issue);

    await issue.save();

    res.status(201).json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 get all issues
exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find();

    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
