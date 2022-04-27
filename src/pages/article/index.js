import React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import Helmet from "react-helmet";

import { ArticleListItem } from "../../components/ArticleListItem";
import Header from "../../components/Header";

const ArticlesPage = ({ data }) => {
    return (
        <Layout>
            <Helmet title="Articles" />
            <article className="main-container">
                <Header
                    title="Articles"
                    description="This is all my articles"
                />
                <section>
                    {data.allMdx.nodes.map((node) => (
                        <ArticleListItem node={node} />
                    ))}
                </section>
            </article>
        </Layout>
    );
};

export const query = graphql`
    query {
        allMdx(sort: { fields: frontmatter___date, order: DESC }) {
            nodes {
                frontmatter {
                    date(formatString: "MMMM D, YYYY")
                    title
                    brief_description
                }
                id
                slug
            }
        }
    }
`;

export default ArticlesPage;
