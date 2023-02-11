if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require('cors')
const express = require("express");
const app = express();
app.use(express.json());
app.use(
  cors({origin:'*'})
);
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));


const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("Connected to Database");
});

const indexRouter = require("./routes/index");
const assignmentRouter = require("./routes/assignments");
const noteRouter = require("./routes/notes");

app.use("/", indexRouter);
app.use("/assignments", assignmentRouter);
app.use("/notes", noteRouter);

app.listen(process.env.PORT || 5000);
