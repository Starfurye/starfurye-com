import React from "react";
import { Link } from "gatsby";
import { FaReact } from "@react-icons/all-files/fa/FaReact";
import { GrGatsbyjs } from "@react-icons/all-files/gr/GrGatsbyjs";

import "../style.css";

const Footer = (props) => {
    return (
        <footer className="footer">
            <span className="footer-maker">Starfurye</span>
            <span className="footer-tools">
                Built with{" "}
                <Link to="https://www.gatsbyjs.com/">
                    <GrGatsbyjs />
                </Link>
                {" & "}
                <Link to="https://reactjs.org/">
                    <FaReact />
                </Link>
            </span>
        </footer>
    );
};

export default Footer;
