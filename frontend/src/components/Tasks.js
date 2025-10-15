import React, { useState, useEffect } from "react";
import api from "../api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks/");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add new task
  const addTask = async () => {
    try {
      await api.post("/tasks/", {
        title,
        description: "",
        status: "pending",
      });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle task status
  const toggleStatus = async (task) => {
    try {
      await api.put(`/tasks/${task.id}/`, {
        ...task,
        status: task.status === "pending" ? "completed" : "pending",
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const deleteTask = async (task) => {
    try {
      await api.delete(`/tasks/${task.id}/`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/login"; // reloads app and takes to login page
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Helper function to format time
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(); // converts to human-readable local time
  };

  return (
    <div className="container mt-4">
      {/* 🔹 Header with Logout Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">My Tasks</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* 🔹 Add Task Input */}
      <div className="mb-3">
        <input
          className="form-control mb-2"
          placeholder="New task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-outline-success" onClick={addTask}>
          Add Task
        </button>
      </div>

      {/* 🔹 Task List */}
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center flex-column flex-sm-row"
          >
            <div className="text-start w-100">
              <span
                style={{
                  textDecoration:
                    task.status === "completed" ? "line-through" : "",
                  fontWeight: "500",
                }}
              >
                {task.title}
              </span>
              <br />
              {/* show created time */}
              <small className="text-muted">
                Created: {formatDate(task.created_at)}
              </small>
            </div>

            <div className="mt-2 mt-sm-0">
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => toggleStatus(task)}
              >
                {task.status === "pending" ? "Complete" : "Undo"}
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteTask(task)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
