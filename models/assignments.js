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
  assignImgType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

assignSchema.virtual("assignImgPath").get(function () {
  if (this.assignImg != null) {
    return `data:${this.assignImgType};charset=utf-8;base64,${this.assignImg.toString(
      "base64"
    )}`;
  }
});

module.exports = mongoose.model("Assign", assignSchema);
