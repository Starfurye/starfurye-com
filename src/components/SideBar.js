import React from "react";
import { CSSTransition } from "react-transition-group";

import "../utils/animation.css";

const SideBar = ({ show, children }) => {
    return (
        <CSSTransition
            in={show}
            timeout={200}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
        >
            <aside className="sidebar">{children}</aside>
        </CSSTransition>
    );
};

export default SideBar;
