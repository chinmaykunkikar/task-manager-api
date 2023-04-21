const Ajv = require("ajv");
const express = require("express");
const bodyParser = require("body-parser");
const tasks = require("./tasks.json");

const app = express();

app.use(bodyParser.json());

const ajv = new Ajv();

const taskSchema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 1 },
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
  const validBody = ajv.validate(taskSchema, newTask);
  if (validBody) res.status(201).json(newTask);
  res.status(400).json({ message: "Task data is not valid" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
