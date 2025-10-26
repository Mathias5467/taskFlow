import { useState, useContext, createContext } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Nav from "./Nav";
import Todo from "./ToDo";
import NewProject from "./NewProject";

export const BurgerContext = createContext();
export const CreatedProjects = createContext();

function App() {
  const [numberOfTasks, setNumberOfTasks] = useState([0, 0, 0, 0]);
  const [projects, setProjects] = useState([]);
  const [burgerClicked, setBurgerClicked] = useState(false);

  const clickBurgerMenu = () => {
    setBurgerClicked((prev) => !prev);
  };

  const addCreatedProject = (project) => {
    setProjects((prev) => [...prev, project]);
  };

  return (
    <HashRouter>
      <div className="content">
        <div
          onClick={clickBurgerMenu}
          className={`burger-menu ${burgerClicked ? "active" : ""}`}
        >
          <div className="burger1"></div>
          <div className="burger2"></div>
          <div className="burger3"></div>
        </div>

        <BurgerContext.Provider value={{ burgerClicked, clickBurgerMenu }}>
          <Nav numberOfTasks={numberOfTasks} projects={projects} />
        </BurgerContext.Provider>

        <main>
          {/* 🔹 Provider musí byť mimo <Routes>, nie vo vnútri */}
          <CreatedProjects.Provider value={{ projects, addCreatedProject }}>
            <Routes>
              <Route path="/" element={<Todo />} />
              <Route path="/projects/new" element={<NewProject />} />
            </Routes>
          </CreatedProjects.Provider>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
