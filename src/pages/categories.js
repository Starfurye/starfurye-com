import React from "react";
import Layout from "../components/layout";
import Helmet from "react-helmet";
import { Header } from "../components/header";

const CategoryPage = () => {
    return (
        <Layout>
            <Helmet title="Categories" />
            <article className="main-container">
                <Header
                    title="Categories"
                    description="This is all my categories"
                />
            </article>
        </Layout>
    );
};

export default CategoryPage;
