import React from "react";

import Footer from "./Footer";
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
