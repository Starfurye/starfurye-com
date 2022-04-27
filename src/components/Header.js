import React from "react";

export const Header = ({ title, description, isCenter }) => {
    return (
        <div className={`main-header${isCenter ? " main-header-center" : ""}`}>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
};
