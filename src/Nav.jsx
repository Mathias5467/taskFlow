import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BurgerContext } from "./App";
import "./nav.css";
import mainItems from "./main.json";

function Nav({ numberOfTasks, projects}) {
    const [hovered, setHovered] = useState(null);
    const pathToImage = "https://mathias5467.github.io/taskFlow/";
    const { burgerClicked, clickBurgerMenu } = useContext(BurgerContext);
    const [seen, setSeen] = useState("show");

    // Show/hide based on burger
    useEffect(() => {
        setSeen(burgerClicked ? "show" : "hide");
    }, [burgerClicked]);


    // Hide nav and close burger when clicking any link
    const handleLinkClick = () => {
        setSeen("hide");
        if (burgerClicked) clickBurgerMenu(); // close burger icon
    };

    return (
        <nav className={seen}>
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
                {mainItems.map((item, index) => {
                    const slug = item.name.toLowerCase().replace(" ", "-");
                    return (
                        <Link
                            to={`/${slug}`}
                            className="link-route"
                            key={`main-${index}`}
                            onClick={handleLinkClick}
                        >
                            <div
                                className="folders-item"
                                onMouseEnter={() => setHovered(`main-${index}`)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <img
                                    className="folders-item-img"
                                    src={
                                        pathToImage +
                                        (hovered === `main-${index}` ? item.active : item.default)
                                    }
                                    alt={item.name}
                                />
                                <h3>{item.name}</h3>
                                <p>{numberOfTasks[index]}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* PROJECTS SECTION */}
            <div className="folders-projects">
                <h2 className="folders-name">PROJECTS</h2>
                <Link to="/projects/new" className="link-route" onClick={handleLinkClick}>
                    <div
                        className="folders-item"
                        onMouseEnter={() => setHovered(`project-0`)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <img
                            className="folders-item-img"
                            src={pathToImage + (hovered === `project-0` ? "plusActive.png" : "plus.png")}
                            alt="new project"
                        />
                        <h3>New project</h3>
                    </div>
                </Link>
            </div>
        </nav>
    );
}

export default Nav;
