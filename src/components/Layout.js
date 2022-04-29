import React from "react";

import Footer from "./Footer";
import Navigation from "./Navigation";

// import "@fontsource/open-sans";
// import "@fontsource/open-sans/500.css";

const Layout = (props) => {
    // 检查是否为移动终端
    const isMobile = window.matchMedia("(max-width: 800px)").matches;

    return (
        <>
            <Navigation isMobile={isMobile} />
            <main>{props.children}</main>
            <Footer />
        </>
    );
};

export default Layout;
