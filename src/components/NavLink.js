// 导航栏选项，样式由父盒子的className决定
import React from "react";
import { Link } from "gatsby";

const navigationTabs = [
    { url: "/article", label: "Articles" },
    { url: "/categories", label: "Categories" },
    { url: "/about", label: "About" },
];

const NavLink = () => {
    return (
        <ul>
            {navigationTabs.map((bar) => (
                <li key={bar.label}>
                    <Link to={bar.url}>{bar.label}</Link>
                </li>
            ))}
        </ul>
    );
};

export default NavLink;
