import { Link } from "gatsby";
import React from "react";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";

import logo from "../assets/galaga-logo.png";

import "../style.css";

const navigationTabs = [
    { url: "/article", label: "Articles" },
    { url: "/categories", label: "Categories" },
    { url: "/about", label: "About me" },
];

const Navigation = (props) => {
    return (
        <nav className="navigation">
            <div className="navigation-main">
                <Link to="/">
                    <div className="site-logo">
                        <img src={logo} alt="logo"></img>
                        {/* <span>Starfurye</span> */}
                    </div>
                </Link>
                <div className="navigation-tab">
                    {navigationTabs.map((bar) => (
                        <Link to={bar.url} key={bar.label}>
                            {bar.label}
                        </Link>
                    ))}
                </div>
                <div className="navigation-links">
                    <Link to="https://github.com/Starfurye">
                        <FaGithub />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
