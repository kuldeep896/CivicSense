const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: { type: [Number], required: true } // [lng, lat]
  },

  severity: { type: Number, min: 1, max: 5, required: true },
  upvotes: { type: Number, default: 0 },
  status: { type: String, default: "pending" },

  priorityScore: { type: Number, default: 0 }
}, { timestamps: true });

// geo index (future nearby queries ke liye)
issueSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Issue", issueSchema);