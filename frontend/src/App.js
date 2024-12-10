import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import TaskList from "./pages/TaskList";
import TaskAdd from "./pages/TaskAdd";
import TaskEdit from "./pages/TaskEdit";
import TaskDelete from "./pages/TaskDelete";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add-task" element={<TaskAdd />} />
          <Route path="/edit-task/:id" element={<TaskEdit />} />
          <Route path="/delete-task/:id" element={<TaskDelete />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
