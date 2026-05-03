const calculatePriority = (issue) => {
  const severity = issue.severity;
  const frequency = issue.upvotes;

  // simple v1 formula
  return (2 * severity) + (1.5 * frequency);
};

module.exports = { calculatePriority };