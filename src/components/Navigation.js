import { Link } from "gatsby";
import React, { useState } from "react";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import Helmet from "react-helmet";

import NavLink from "./NavLink";
import logo from "../assets/galaga-logo.png";
import Overlay from "./Overlay";
import SideBar from "./SideBar";
import configs from "../utils/configs";

import "../style.css";

const Navigation = ({ isMobile }) => {
    const [sideBarIsOpen, setSidebBarIsOpen] = useState(false);

    const openSideBarHandler = () => {
        setSidebBarIsOpen(true);
    };
    const closeSideBarHandler = () => {
        setSidebBarIsOpen(false);
    };

    return (
        <>
            {sideBarIsOpen && (
                <Helmet
                    bodyAttributes={{
                        // 解决背景滚动问题
                        style: "overflow: hidden",
                    }}
                />
            )}
            {isMobile && sideBarIsOpen && (
                <Overlay onClick={closeSideBarHandler} />
            )}
            {isMobile && (
                <SideBar show={sideBarIsOpen}>
                    <div
                        className="sidebar-header-img"
                        style={{
                            height: "150px",
                            width: "100%",
                            marginBottom: "2rem",
                            background: `url(${configs.mainImgURL}) no-repeat`,
                            border: "1px solid transparent",
                        }}
                    ></div>
                    <nav className="navigation-side">
                        <NavLink />
                    </nav>
                </SideBar>
            )}
            <nav className="navigation">
                <div className="navigation-main">
                    {isMobile && (
                        // hamburger menu
                        <button
                            className="navigation-menu-button"
                            onClick={openSideBarHandler}
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    )}
                    <Link to="/">
                        <div className="site-logo">
                            <img src={logo} alt="logo"></img>
                            {/* <span>Starfurye</span> */}
                        </div>
                    </Link>
                    {isMobile ? (
                        ""
                    ) : (
                        <nav className="navigation-tab">
                            <NavLink />
                        </nav>
                    )}
                    <div className="navigation-links">
                        <Link to="https://github.com/Starfurye">
                            <FaGithub />
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;
