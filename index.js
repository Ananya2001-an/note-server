const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Note = require("./models/notes");
const Assign = require("./models/assignments");
require("dotenv").config();

app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '1000mb', extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, user: process.env.DB_USER, pass: process.env.DB_PASS, dbName: process.env.DB_NAME });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('Connected to DB'); });

app.get("/", async (req, res) => {
  let assignments;
  try {
    assignments = await Assign.find({ priority: true })
      .sort({ deadline: 1 })
      .exec();
  } catch {
    assignments = [];
  }

  res.json(assignments);
});

app.get("/assignments", async (req, res) => {
  let searchOptions = {};
  if (req.query.search != null && req.query.search !== "") {
    searchOptions.name = new RegExp(req.query.search, "i");
  }

  try {
    const assignments = await Assign.find(searchOptions);
    res.json(assignments);
  } catch {
    res.json({ data: "Assignment not found!" });
  }
});

app.post("/assignments", async (req, res) => {
  const assignment = new Assign({
    name: req.body.name,
    deadline: new Date(req.body.deadline),
    subject: req.body.subject,
    priority: req.body.priority,
  });

  if (req.body.img != "") {
    assignment.assignImg = req.body.img;
  }

  try {
    await assignment.save();
    res.json({ data: "Assignment saved successfully!" });
  } catch {
    res.json({ data: "Couldn't add assignment!" });
  }
});

app.put("/assignments/:id", async (req, res) => {
  let assignment;
  try {
    assignment = await Assign.findById(req.params.id);
    assignment.name = req.body.name;
    assignment.deadline = new Date(req.body.deadline);
    assignment.subject = req.body.subject;
    assignment.priority = req.body.priority;
    if (req.body.img != null && req.body.img != "") {
      assignment.assignImg = req.body.img;
    }

    await assignment.save();
    res.json({ data: "Assignment Updated successfully!" });
  } catch {
    res.json({ data: "Couldn't update assignment!" });
  }
});

app.delete("/assignments/:id", async (req, res) => {
  let assignment;
  try {
    assignment = await Assign.findById(req.params.id);
    await assignment.remove();
    res.json({ data: "Assignment deleted successfully!" });
  } catch {
    res.json({ data: "Couldn't delete assignment!" });
  }
});

app.get("/notes", async (req, res) => {
  let searchOptions = {};
  if (req.query.search != null && req.query.search !== "") {
    searchOptions.name = new RegExp(req.query.search, "i");
  }

  try {
    const notes = await Note.find(searchOptions);
    res.json(notes);
  } catch {
    res.json({ data: "Note not found!" });
  }
});

app.post("/notes", async (req, res) => {
  const note = new Note({
    name: req.body.name,
    note: req.body.note,
  });
  if (req.body.img != null && req.body.img != "") {
    note.cover = req.body.img;
  }
  try {
    console.log(note);
    await note.save();
    res.json({ data: "Note saved successfully!" });
  } catch {
    res.json({ data: "Couldn't add note!" });
  }
});

app.put("/notes/:id", async (req, res) => {
  let note;
  try {
    note = await Note.findById(req.params.id);
    note.name = req.body.name;
    note.note = req.body.note;

    if (req.body.img != "") {
      note.cover = req.body.img;
    }

    await note.save();
    res.json({ data: "Note updated successfully!" });
  } catch {
    res.json({ data: "Couldn't update note!" });
  }
});

app.delete("/notes/:id", async (req, res) => {
  let note;
  try {
    note = await Note.findById(req.params.id);
    await note.remove();
    res.json({ data: "Note deleted successfully!" });
  } catch {
    res.json({ data: "Couldn't delete note!" });
  }
});

app.listen(5000, ()=>{
  console.log("Server is listening...")
});
