const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  cover: {
    type: Buffer,
    required: true,
  },
  coverType: {
    type: String,
    required: true,
  },
});

noteSchema.virtual("coverPath").get(function () {
  if (this.cover != null) {
    return `data:${this.coverType};charset=utf-8;base64,${this.cover.toString(
      "base64"
    )}`;
  }
});

module.exports = mongoose.model("Note", noteSchema);
