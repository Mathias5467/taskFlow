import { useState } from "react";
import { Link } from 'react-router-dom';
import './nav.css';
import mainItems from './main.json';

function Nav({ numberOfTasks }) {
    const [hovered, setHovered] = useState(null);
    const [newProjectHovered, setNewProjectHovered] = useState("");
    const pathToImage = "https://mathias5467.github.io/taskFlow/";

    return (
        <nav>
            <section className="logo-section">
                <img className="logo-icon" alt="logo" src={pathToImage + "logo.png"} />
                <div className="logo-text">
                    <h1>TaskFlow</h1>
                    <p>Be consistent</p>
                </div>
            </section>

            {/* MAIN SECTION */}
            <div className="folders-main">
                <h2 className="folders-name">MAIN</h2>
                {mainItems.map((item, index) => (
                    <div
                        key={`main-${index}`}
                        className="folders-item"
                        onMouseEnter={() => setHovered(`main-${index}`)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <img
                            className="folders-item-img"
                            src={hovered === `main-${index}` ? item.active : item.default}
                            alt={item.name}
                        />
                        <h3>{item.name}</h3>
                        <p>{numberOfTasks[index]}</p>
                    </div>
                ))}
            </div>

            {/* PROJECTS SECTION */}
            <div className="folders-projects">
                <h2 className="folders-name">PROJECTS</h2>
                <Link to="/projects/new" >
                    <div
                        className="folders-item"
                        onMouseEnter={() => setHovered(`project-0`)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <img
                            className="folders-item-img"
                            src={hovered === `project-0` ? "/plusActive.png" : "/plus.png"}
                            alt="new project"
                        />
                        <h3>New project</h3>
                    </div>
                </Link>

            </div>

            {/* LABELS SECTION */}
            <div className="folders-labels">
                <h2 className="folders-name">LABELS</h2>
                <div></div>
            </div>
        </nav>
    );
}

export default Nav;
