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
    res.json(notes);
  } catch {
    res.json("Note not found!");
  }
});

router.post("/", async (req, res) => {
  const note = new Note({
    name: req.body.name,
    note: req.body.note,
  });
  if (req.body.img != null && req.body.img != "") {
    note.cover = req.body.img
  }
  try {
    await note.save();
    res.json("Note saved successfully!");
  } catch {
   res.json("Couldn't add note!")
  }
});


router.put("/:id", async (req, res) => {
  let note;
  try {
    note = await Note.findById(req.params.id);
    note.name = req.body.name;
    note.note = req.body.note;

    if (req.body.img != null && req.body.img != "") {
      saveimg(note, req.body.img);
    }

    await note.save();
    res.json("Note updated successfully!")

  } catch {
    res.json("Couldn't update note!")
  }
});

router.delete("/:id", async (req, res) => {
  let note;
  try {
    note = await Note.findById(req.params.id);
    await note.remove();
    res.json("Note deleted successfully!")
  } catch {
    res.json("Couldn't delete note!")
  }
});

// function saveimg(note, imgencoded) {
//   if (imgencoded == null) return;
//   const imgnew = JSON.parse(imgencoded);
//   if (imgnew != null) {
//     note.cover = new Buffer.from(imgnew.data, "base64");
//     note.coverType = imgnew.type;
//   }
// }

module.exports = router;
