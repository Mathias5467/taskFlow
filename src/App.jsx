import { useState, createContext } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Nav from "./Nav";
import Todo from "./ToDo";
import NewProject from "./NewProject";

export const BurgerContext = createContext();
export const CreatedProjectsContext = createContext();

function App() {
  const [numberOfTasks] = useState([0, 0, 0, 0]);
  const [projects, setProjects] = useState([]);
  const [burgerClicked, setBurgerClicked] = useState(false);

  const clickBurgerMenu = () => setBurgerClicked((prev) => !prev);
  const addCreatedProject = (project) => setProjects((prev) => [...prev, project]);

  return (
    <HashRouter>
      <div className="content">
        <div onClick={clickBurgerMenu} className={`burger-menu ${burgerClicked ? "active" : ""}`}>
          <div className="burger1"></div>
          <div className="burger2"></div>
          <div className="burger3"></div>
        </div>

        <CreatedProjectsContext.Provider value={{ projects, addCreatedProject }}>
          <BurgerContext.Provider value={{ burgerClicked, clickBurgerMenu }}>
            <Nav numberOfTasks={numberOfTasks} />
          </BurgerContext.Provider>

          <main>
            <Routes>
              <Route path="/" element={<Todo />} />
              <Route path="/projects/new" element={<NewProject />} />
            </Routes>
          </main>
        </CreatedProjectsContext.Provider>
      </div>
    </HashRouter>
  );
}

export default App;
