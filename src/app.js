const Ajv = require("ajv");
const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(bodyParser.json());

const ajv = new Ajv();

const TASKS_JSON = path.join(__dirname, "tasks.json");
const dataFile = fs.readFileSync(TASKS_JSON, "utf-8");
const tasksData = JSON.parse(dataFile);

const taskSchema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 1 },
    title: { type: "string", minLength: 1 },
    description: { type: "string", minLength: 1 },
    completed: { type: "boolean" },
    priority: { type: "string", enum: ["low", "medium", "high"] },
  },
  required: ["title", "description", "completed", "priority"],
  additionalProperties: false,
};

function writeFileSyncWrapper(file, data) {
  fs.writeFileSync(file, data, {
    encoding: "utf8",
    flag: "w",
  });
}

// GET retrieve all tasks
app.get("/tasks", (req, res) => {
  const { completed, sort } = req.query;
  console.log(sort);
  let isCompleted =
    completed === undefined || completed.toLowerCase() === "false"
      ? false
      : true;
  let filteredTasks = tasksData;
  filteredTasks = filteredTasks.tasks.filter(
    (task) => task.completed === isCompleted
  );

  if (sort !== undefined) {
    filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  res.json(filteredTasks);
});

// GET retrieve a single task by ID
app.get("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const task = tasksData.tasks.find((task) => task.id === taskId);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// GET retrieve tasks based on priority level
app.get("/tasks/priority/:level", (req, res) => {
  const priorityLevel = req.params.level;
  const filteredTasks = tasksData.tasks.filter(
    (task) => task.priority === priorityLevel
  );
  res.status(200).json(filteredTasks);
});

// POST create a new task
app.post("/tasks", (req, res) => {
  const newTask = req.body;
  let tasksModified = JSON.parse(JSON.stringify(tasksData));
  const validBody = ajv.validate(taskSchema, newTask);
  if (validBody) {
    newTask.createdAt = Date.now();
    tasksModified.tasks.push(newTask);
    writeFileSyncWrapper(TASKS_JSON, JSON.stringify(tasksModified));
    res.status(201).json(newTask);
  } else {
    res.status(400).json({ message: "Invalid task data" });
  }
});

// DELETE delete a task by ID
app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasksData.tasks.findIndex((task) => task.id === taskId);
  let tasksModified = JSON.parse(JSON.stringify(tasksData));
  if (taskIndex !== -1) {
    tasksModified.tasks.splice(taskIndex, 1);
    writeFileSyncWrapper(TASKS_JSON, JSON.stringify(tasksModified));
    res.status(200).json({ message: "Task deleted" });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// PUT update an existing task by ID
app.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  let tasksModified = JSON.parse(JSON.stringify(tasksData));
  const valid = ajv.validate(taskSchema, updatedTask);
  if (valid) {
    const taskIndex = tasksModified.tasks.findIndex(
      (task) => task.id === taskId
    );
    if (taskIndex !== -1) {
      updatedTask.id = taskId;
      updatedTask.createdAt = tasksModified.tasks[taskIndex].createdAt;
      tasksModified.tasks[taskIndex] = updatedTask;
      writeFileSyncWrapper(TASKS_JSON, JSON.stringify(tasksModified));
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } else {
    res.status(400).json({ message: "Invalid task data" });
  }
});

// Handle other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
