import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TaskItem = ({ task, onDelete, onEdit, onToggleStatus }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/tasks/${task.id}`);
      onDelete(task.id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleStatus = async () => {
    try {
      const updatedStatus = !task.status;
      await axios.put(`http://localhost:8800/tasks/${task.id}`, {
        ...task,
        status: updatedStatus,
      });
      onToggleStatus(task.id, updatedStatus);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-task/${task.id}`);
  };

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{task.name}</h3>
          <p className="text-gray-600">{task.description}</p>
          <p className="text-sm text-gray-500">
            Status: {task.status ? "Completed" : "Not Completed"}
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleToggleStatus}
            className={`px-4 py-2 text-white rounded-md ${
              task.status ? "bg-green-500" : "bg-yellow-500"
            }`}
          >
            {task.status ? "Mark as Not Completed" : "Mark as Completed"}
          </button>
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
