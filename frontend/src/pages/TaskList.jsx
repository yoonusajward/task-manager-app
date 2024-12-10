import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/tasks");
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTasks();
  }, []);

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleToggleStatus = (taskId, updatedStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: updatedStatus } : task
      )
    );
  };

  const handleEditComplete = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.status;
    if (filter === "notCompleted") return !task.status;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Task Manager</h2>
      <TaskFilter filter={filter} setFilter={setFilter} />
      <div className="mt-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
              onEdit={handleEditComplete}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">
            No tasks to display. Add a task to get started!
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
