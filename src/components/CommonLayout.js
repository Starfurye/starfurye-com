import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { Header } from "./header";

const CommonLayout = (props) => {
    return (
        <>
            <Navigation />
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
