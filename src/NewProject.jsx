import './newProject.css';
import colors from './colors.json';
import { useContext, useState } from 'react';
import { CreatedProjectsContext } from './App';

function NewProject() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [colorScheme, setColorScheme] = useState("#26A69A");
    const [colorSelected, setColorSelected] = useState(null);
    const [doneTasks, setDoneTasks] = useState([]);
    const { addCreatedProject } = useContext(CreatedProjectsContext);
    const [titleMessage, setTitleMessage] = useState(false);
    const [descriptionMessage, setDescriptionMessage] = useState(false);
    const done = "✔";

    const setColor = (colorHex, key) => {
        setColorSelected(key);
        setColorScheme(colorHex);
    };

    const addNewProject = () => {
        if (!title.trim()) setTitleMessage(true);
        if (!description.trim()) setDescriptionMessage(true);
        if (!description.trim() || !title.trim()) return;
        const newProject = { title, description, color: colorScheme };
        addCreatedProject(newProject);
        setTitle("");
        setDescription("");

    };

    const updateDoneTasks = (task) => {
        setDoneTasks((prev) =>
            prev.includes(task) ? prev.filter((item) => item !== task) : [...prev, task]
        );
    };

    return (
        <div className="project-create">
            <div className="project-create-title">
                <h1>Let's create something new...</h1>
            </div>
            <div className="project-details">
                <div className="project-details-main">
                    <h2>Project Details</h2>
                    <h3>Project Title</h3>
                    <div className={`message-title ${titleMessage ? "show" : "hide"}`}>
                        Type some title!
                    </div>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className="input-title"
                        placeholder="Enter project title..."
                        type="text"
                        onFocus={() => { setTitleMessage(false) }}
                    />
                    <h3>Description (Optional)</h3>
                    <div className={`description-title ${descriptionMessage ? "show" : "hide"}`}>
                        Type some description!
                    </div>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="input-description"
                        placeholder="Add a brief description..."
                        onFocus={() => setDescriptionMessage(false)}
                    ></textarea>
                    <h3>Choose Project Color</h3>
                    <div className="colors">
                        {colors.map((color, index) => (
                            <div
                                onClick={() => setColor(color.hex, index)}
                                style={{ background: color.hex }}
                                key={index}
                                className={colorSelected === index ? "color active" : "color"}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="project-create-preview">
                    <h2>Preview</h2>
                    <div className="project-preview">
                        <h2 style={{ background: colorScheme }}>{title || "New Project"}</h2>
                        <div className="task-list">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    onClick={() => updateDoneTasks(index)}
                                    key={index}
                                    style={{ border: `1px solid ${colorScheme}` }}
                                    className="task"
                                >
                                    <div
                                        style={
                                            doneTasks.includes(index)
                                                ? { border: `3px solid ${colorScheme}`, backgroundColor: colorScheme }
                                                : { border: `3px solid ${colorScheme}` }
                                        }
                                        className="task-circle"
                                    >
                                        {doneTasks.includes(index) ? done : ""}
                                    </div>
                                    <div className="task-text">Task {index + 1}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="create-button" onClick={addNewProject}>
                        <p>Create</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewProject;
