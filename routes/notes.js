const express = require("express");
const router = express.Router();
const Note = require("../models/notes");

router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }

  try {
    const notes = await Note.find(searchOptions);
    res.json({ data: notes });
  } catch {
    res.json({ data: "Note not found!" });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body)
  const note = new Note({
    name: req.body.name,
    note: req.body.note,
  });
  if (req.body.img != null && req.body.img != "") {
    note.cover = req.body.img
  }
  try {
    await note.save();
    res.json({ data: "Note saved successfully!" });
  } catch {
   res.json({ data: "Couldn't add note!" });
  }
});


router.put("/:id", async (req, res) => {
  let note;
  try {
    note = await Note.findById(req.params.id);
    note.name = req.body.name;
    note.note = req.body.note;

    if (req.body.img != null && req.body.img != "") {
     note.cover = req.body.img;
    }

    await note.save();
    res.json({ data: "Note updated successfully!" });

  } catch {
    res.json({ data: "Couldn't update note!" });
  }
});

router.delete("/:id", async (req, res) => {
  let note;
  try {
    note = await Note.findById(req.params.id);
    await note.remove();
    res.json({ data: "Note deleted successfully!" });
  } catch {
    res.json({ data: "Couldn't delete note!" });
  }
});

module.exports = router;
