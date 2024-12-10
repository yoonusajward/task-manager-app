import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


app.use(express.json());
app.use(cors());

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the MySQL database!");
});

app.get("/", (req, res) => {
  res.json("Hello, this is the backend");
});

// Get all tasks
app.get("/tasks", (req, res) => {
  const q = "SELECT * FROM tasks";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Add a new task
app.post("/tasks", (req, res) => {
  const q = "INSERT INTO tasks (`name`, `description`, `status`) VALUES (?, ?, ?)";
  const values = [req.body.name, req.body.description, req.body.status];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Task added successfully!");
  });
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const q = "DELETE FROM tasks WHERE id = ?";

  db.query(q, [taskId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting task", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully!" });
  });
});

// Get task by ID
app.get("/tasks/:id", (req, res) => {
    const taskId = req.params.id;
    const q = "SELECT * FROM tasks WHERE id = ?";
    db.query(q, [taskId], (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching task", error: err });
      }
      if (data.length === 0) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.json(data[0]); // Send the task object
    });
  });

// Update a task
app.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const q = "UPDATE tasks SET `name` = ?, `description` = ?, `status` = ? WHERE id = ?";

  const values = [req.body.name, req.body.description, req.body.status];

  db.query(q, [...values, taskId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating task", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task updated successfully!" });
  });
});

app.listen(8800, () => {
  console.log("Backend server running on port 8800!");
});
