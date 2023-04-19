# Task Manager API

**Objective**: Build a RESTful API for a simple task manager application with the following endpoints -
| Endpoint | Description |
|--:|:--|
| `GET /tasks` | Retrieve all tasks. |
| `GET /tasks/:id` | Retrieve a single task by its ID. |
| `POST /tasks`| Create a new task. |
| `PUT /tasks/:id` | Update an existing task by its ID. |
| `DELETE /tasks/:id` | Delete a task by its ID. |

### Tasks

1. Use an **in-memory data store** (e.g., an array) to store the tasks.
2. Implement proper **error handling** for invalid requests.
3. Add **input validation** for task creation and updates. Validate that the title and description are not empty, and that the completion status is a boolean value.
4. **Test** the API using Postman or Curl to ensure it works as expected.

#### Optional Tasks

1. Implement filtering and sorting for the GET /tasks endpoint. For example, users should be able to filter tasks based on completion status and sort them by creation date.
2. Allow users to assign a priority level (e.g., low, medium, high) to each task. Update the API to support this new attribute in task creation, updates, and retrieval.
3. Implement an endpoint to retrieve tasks based on priority level: GET `/tasks/priority/:level`.

The tasks (tasks.json) should have a _title_, _description_, and a flag for _completion status_.
