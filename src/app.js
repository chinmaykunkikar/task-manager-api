const Ajv = require("ajv");
const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const path = require("path");
const tasks = require("./tasks.json");

const app = express();

app.use(bodyParser.json());

const ajv = new Ajv();

const taskSchema = {
  type: "object",
  properties: {
    id: { type: "number", minLength: 1 },
    title: { type: "string", minLength: 1 },
    description: { type: "string", minLength: 1 },
    completed: { type: "boolean" },
  },
  required: ["title", "description", "completed"],
  additionalProperties: false,
};

// GET retrieve all tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// POST create a new task
app.post("/tasks", (req, res) => {
  const newTask = req.body;
  let writePath = path.join(__dirname, "..", "tasks.json");
  let tasksModified = JSON.parse(JSON.stringify(tasks));
  const validBody = ajv.validate(taskSchema, newTask);
  if (validBody) {
    tasksModified.tasks.push(newTask);
    fs.writeFileSync(writePath, JSON.stringify(tasksModified), {
      encoding: "utf8",
      flag: "w",
    });
    res.status(201).json(newTask);
  } else {
    res.status(400).json({ message: "Invalid task data" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
