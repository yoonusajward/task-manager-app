import React from "react";

const TaskFilter = ({ filter, setFilter }) => {
  const buttonClasses = (active) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
      active
        ? "bg-blue-500 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`;

  return (
    <div className="flex justify-center space-x-4 my-4">
      <button
        className={buttonClasses(filter === "all")}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={buttonClasses(filter === "completed")}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
      <button
        className={buttonClasses(filter === "notCompleted")}
        onClick={() => setFilter("notCompleted")}
      >
        Not Completed
      </button>
    </div>
  );
};

export default TaskFilter;
