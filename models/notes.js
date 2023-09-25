const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model("Note", noteSchema);
