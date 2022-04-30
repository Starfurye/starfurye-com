import React from "react";

import Footer from "./Footer";
// Gatsby building 过程中访问不了window
// if (typeof window !== "undefined") {
//     const Navigation = require("./Navigation");
// }
import Navigation from "./Navigation";

const Layout = (props) => {
    return (
        <>
            <Navigation />
            <main>{props.children}</main>
            <Footer />
        </>
    );
};

export default Layout;
