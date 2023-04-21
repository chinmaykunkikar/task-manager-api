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
    title: { type: "string", minLength: 1 },
    description: { type: "string", minLength: 1 },
    completed: { type: "boolean" },
  },
  required: ["title", "description", "completed"],
  additionalProperties: false,
};

// retrieve all tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
