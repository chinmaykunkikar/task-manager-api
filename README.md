# Task Manager API

### Assignment 01

**Problem Statement** -- Build a RESTful API for a simple task manager application with the following endpoints

|                     Endpoint | Description                                        |
| ---------------------------: | :------------------------------------------------- |
|                 `GET /tasks` | Retrieve all tasks.                                |
|             `GET /tasks/:id` | Retrieve a single task by its ID.                  |
| `GET /tasks/priority/:level` | Retrieve tasks based on priority level. (Optional) |
|                `POST /tasks` | Create a new task.                                 |
|             `PUT /tasks/:id` | Update an existing task by its ID.                 |
|          `DELETE /tasks/:id` | Delete a task by its ID.                           |

#### Tasks

- [x] Use an **in-memory data store** (e.g., an array) to store the tasks.
- [x] Implement proper **error handling** for invalid requests.
- [x] Add **input validation** for task creation and updates. Validate that the title and description are not empty, and that the completion status is a boolean value.
- [x] **Test** the API using Postman or Curl to ensure it works as expected.

##### Optional Tasks

- [x] Implement **filtering and sorting** for the `GET /tasks` endpoint. For example, users should be able to filter tasks based on completion status and sort them by creation date.
- [x] Allow users to assign a **priority level** (e.g., _low_, _medium_, _high_) to each task. Update the API to support this new attribute in task creation, updates, and retrieval.
- [x] Implement an endpoint to retrieve tasks based on priority level: `GET /tasks/priority/:level`.

### Schema

```js
{
  "tasks": [
		{
		  "id": "string",
		  "title": "string",
		  "description": "string",
		  "completed": boolean,
		  "createdAt": Date.now() // a.k.a Unix epoch
		}
	]
}
```

### Tests (using `cURL`)

> (Use the data from [tasks.json file](./src/tasks.json))

1. **`GET /tasks`**

```curl
curl --location "localhost:3000/tasks?completed=false&sort=1"
```

2. **`GET /tasks/:id`**

```curl
curl --location "localhost:3000/tasks/5"
```

3. **`GET /tasks/priority/:level`**

```curl
curl --location "localhost:3000/tasks/priority/high"
```

4. **`POST /tasks`**

```curl
curl --location 'localhost:3000/tasks' \
--header 'Content-Type: application/json' \
--data '{
    "id": "99",
    "title": "Task 99",
    "description": "This is task 99",
    "completed": false
}'
```

5. **`DELETE /tasks/:id`**

```curl
curl --location --request DELETE "localhost:3000/tasks/2"
```

6. **`PUT /tasks/:id`**

```curl
curl --location --request PUT 'localhost:3000/tasks/2' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Task 2",
    "description": "Task 2.5",
    "completed": true,
    "priority": "high"
  }'
```
