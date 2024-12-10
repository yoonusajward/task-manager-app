import React from "react";
import axios from "axios";

const TaskDelete = ({ taskId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/tasks/${taskId}`);
      onDelete(taskId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
    >
      Delete
    </button>
  );
};

export default TaskDelete;
