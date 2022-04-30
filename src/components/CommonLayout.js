import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import Header from "./Header";

const CommonLayout = (props) => {
    // 检查是否为移动终端
    const isMobile = window.matchMedia("(max-width: 800px)").matches;

    return (
        <>
            <Navigation isMobile={isMobile} />
            <main>
                <article className="main-container">
                    <Header
                        title="About me"
                        description="An interview to starfurye, who is that?"
                        isCenter={true}
                    />
                    {props.children}
                </article>
            </main>
            <Footer />
        </>
    );
};

export default CommonLayout;
