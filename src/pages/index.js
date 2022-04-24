import React from "react";

import configs from "../utils/configs";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import { Header } from "../components/header";

const IndexPage = () => {
    return (
        <Layout>
            <Helmet title={configs.siteTitle} />
            <article className="main-container">
                <Header title="Starfurye" description="Home" />
            </article>
        </Layout>
    );
};

export default IndexPage;
