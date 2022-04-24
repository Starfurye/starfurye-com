import React from "react";

import Footer from "./Footer";
import Navigation from "./Navigation";

import "@fontsource/open-sans";
// import "@fontsource/open-sans/500.css";

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
