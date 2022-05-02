import React from "react";
import Layout from "../components/Layout";
import Helmet from "react-helmet";

const NotFoundPage = () => {
    return (
        <Layout>
            <Helmet title="未知星系" />
            <div className="not-found">404</div>
        </Layout>
    );
};

export default NotFoundPage;
