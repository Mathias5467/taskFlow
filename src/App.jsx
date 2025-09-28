import { useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Nav from "./Nav";
import Todo from "./ToDo";

function App() {
  const [numberOfTasks, setNumberOfTasks] = useState([0, 0, 0, 0]);
  const [projects, setProjects] = useState([]);
  return (
    <HashRouter>
      <div className="content">
      <Nav numberOfTasks={numberOfTasks} />
      <main>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/projects/new" element={<div>Create a new project</div>} />
        </Routes>
      </main>
    </div>
    </HashRouter>
    
  );
}

export default App;
