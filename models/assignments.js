const mongoose = require("mongoose");

const assignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  deadline: {
    type: Date,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  priority: {
    type: Boolean,
    required: true,
  },

  assignImg: {
    type: Buffer,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Assign", assignSchema);
