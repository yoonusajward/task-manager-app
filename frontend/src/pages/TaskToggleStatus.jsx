import React from "react";
import axios from "axios";

const TaskToggleStatus = ({ task, onToggleStatus }) => {
  const handleToggle = async () => {
    const updatedStatus = !task.status;
    try {
      await axios.put(`http://localhost:8800/tasks/${task.id}`, {
        ...task,
        status: updatedStatus,
      });
      onToggleStatus(task.id, updatedStatus);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`px-3 py-1 rounded-md text-white ${
        task.status
          ? "bg-yellow-500 hover:bg-yellow-600"
          : "bg-green-500 hover:bg-green-600"
      }`}
    >
      {task.status ? "Mark as Not Completed" : "Mark as Completed"}
    </button>
  );
};

export default TaskToggleStatus;
