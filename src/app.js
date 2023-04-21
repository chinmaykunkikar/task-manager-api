const express = require("express");
const bodyParser = require("body-parser");
const tasksData = require("./tasks.json");

const app = express();

app.use(bodyParser.json());

const tasks = JSON.parse(tasksData);

// retrieve all tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
