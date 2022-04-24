import React from "react";

export const Header = ({ title, description }) => {
    return (
        <div className="main-header">
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
};
