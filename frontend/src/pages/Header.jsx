import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Task Manager</h1>
      <nav>
        <Link
          to="/"
          className="px-2 py-1 bg-blue-700 rounded hover:bg-blue-600"
        >
          Home
        </Link>
        <Link
          to="/add-task"
          className="ml-4 px-2 py-1 bg-blue-700 rounded hover:bg-blue-600"
        >
          Add Task
        </Link>
      </nav>
    </header>
  );
};

export default Header;
