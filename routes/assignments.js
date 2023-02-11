const express = require("express");
const router = express.Router();
const Assign = require("../models/assignments");

router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }

  try {
    const assignments = await Assign.find(searchOptions);
    res.json(assignments);
  } catch {
    res.json("Assignment not found!");
  }
});


router.post("/", async (req, res) => {
  const assignment = new Assign({
    name: req.body.name,
    deadline: new Date(req.body.deadline),
    subject: req.body.subject,
    priority: req.body.priority,
  });

  if (req.body.img != null && req.body.img != "") {
      assignment.assignImg = req.body.img;
  }

  try {
    await assignment.save();
    res.json("Assignment saved successfully!")
  } catch {
    res.json("Couldn't add assignment!")
  }
});


router.put("/:id", async (req, res) => {
  let assignment;
  try {
    assignment = await Assign.findById(req.params.id);
    assignment.name = req.body.name;
    assignment.deadline = new Date(req.body.deadline);
    assignment.subject = req.body.subject;
    assignment.priority = req.body.priority;
    if (req.body.img != null && req.body.img != "") {
      assignment.assignImg = req.body.img
    }

    await assignment.save();
    res.json("Assignment Updated successfully!");

  } catch {
    res.json("Couldn't update assignment!")
  }
});

router.delete("/:id", async (req, res) => {
  let assignment;
  try {
    assignment = await Assign.findById(req.params.id);
    await assignment.remove();
    res.json("Assignment deleted successfully!");
  } catch {
    res.json("Couldn't delete assignment!")
  }
});

module.exports = router;
