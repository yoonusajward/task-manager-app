import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const TaskEdit = () => {
  const [task, setTask] = useState({
    name: "",
    description: "",
    status: false,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const taskId = location.pathname.split("/")[2];

  // Fetch task data when the component mounts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/tasks/${taskId}`
        );
        setTask(response.data);
      } catch (err) {
        setError("Failed to fetch task data.");
        console.log(err);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setTask((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
    } else {
      setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/tasks/${taskId}`, task);
      navigate("/");
    } catch (err) {
      setError("Failed to update task.");
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-500">
        Update the Task
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Task Name
          </label>
          <input
            type="text"
            placeholder="Enter task name"
            name="name"
            value={task.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            placeholder="Enter task description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="status"
              checked={task.status}
              onChange={handleChange}
              className="form-checkbox text-blue-500 h-5 w-5"
            />
            <span className="ml-2 text-gray-700">Mark as Completed</span>
          </label>
        </div>
        <button
          onClick={handleClick}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default TaskEdit;
