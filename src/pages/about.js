import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import { Header } from "../components/header";

const AboutPage = () => {
    return (
        <Layout>
            <Helmet title="About me" />
            <article className="main-container">
                <Header title="About me" description="This is all about me" />
            </article>
        </Layout>
    );
};

export default AboutPage;
