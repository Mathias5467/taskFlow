import './newProject.css';
import colors from './colors.json';
import { useState } from 'react';

function NewProject() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [colorScheme, setColorScheme] = useState("#26A69A");
    const [colorSelected, setColorSelected] = useState(null);
    const [doneTasks, setDoneTasks] = useState([]);
    const done = "✔";

    const setColor = (colorHex, key) => {
        setColorSelected(key);
        setColorScheme(colorHex);
        console.log(colorHex);
    }

    const updateTitle = (e) => {
        const newName = e.target.value;
        setTitle(newName);
    }

    const updateDescription = (e) => {
        const newDescription = e.target.value;
        setDescription(newDescription);
    }

    const updateDoneTasks = (task) => {
        if (doneTasks.includes(task)) {
            setDoneTasks((prev) => prev.filter((item) => item !== task))
        } else {
            setDoneTasks((prev) => [...prev, task]);
        }
    }
    return (
        <div className="project-create">
            <div className="project-header">
                <h1 className="project-header-title">Create New Project</h1>
                <p className="project-header-moto">Let's make something new...</p>
            </div>
            <div className="project-details">
                <div className="project-details-main">
                    <h2>Project Details</h2>
                    <h3>Project Title</h3>
                    <input onChange={updateTitle} value={title} className="input-title" placeholder='Enter project title...' type="text"></input>
                    <h3>Description (Optional)</h3>
                    <textarea onChange={updateDescription} value={description} className="input-description" placeholder='Add a brief description...'></textarea>
                    <h3>Choose Project Color</h3>
                    <div className="colors">
                        {colors.map((color, index) => {
                            return (
                                <div
                                    onClick={() => setColor(color.hex, color + index)}
                                    style={{ background: color.hex }}
                                    key={color + index}
                                    className={colorSelected === (color + index) ? "color active" : "color"}>
                                </div>);
                        })}
                    </div>
                </div>
                <div className="project-create-preview">
                    <h2>Preview</h2>
                    <div className="project-preview">
                        <h2 style={{ background: colorScheme }}>{title ? title : "New Project"}</h2>
                        <div className="task-list">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div
                                    onClick={() => updateDoneTasks(index)}
                                    key={index}
                                    style={{ border: `1px solid ${colorScheme}` }}
                                    className="task"
                                >
                                    <div
                                        style={doneTasks.includes(index) ? { border: `3px solid ${colorScheme}`, backgroundColor: colorScheme} : { border: `3px solid ${colorScheme}` }}
                                        className="task-circle"
                                    >{doneTasks.includes(index) ? done : ""}</div>
                                    <div className="task-text">Task {index + 1}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="create-button">

                    </div>
                </div>
            </div>
        </div>

    );
}

export default NewProject;