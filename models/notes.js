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
  }
});

module.exports = mongoose.model("Note", noteSchema);
