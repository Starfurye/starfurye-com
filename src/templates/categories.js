import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Header from "../components/Header";
import { ArticleListItem } from "../components/ArticleListItem";

const Categories = ({ pageContext, data }) => {
    const { category } = pageContext;
    const { edges } = data.allMdx;
    return (
        <Layout>
            <Helmet title={`${category} | Categories`} />
            <article className="main-container">
                <Header
                    title={category}
                    description={`Article list of category - ${category}`}
                    isCenter={false}
                />
                <ul>
                    {edges.map(({ node }) => (
                        <ArticleListItem node={node} prefix="/article/" />
                    ))}
                </ul>
            </article>
        </Layout>
    );
};

export default Categories;

export const categoryQuery = graphql`
    query ($category: String) {
        allMdx(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { categories: { in: [$category] } } }
        ) {
            totalCount
            edges {
                node {
                    slug
                    frontmatter {
                        title
                        brief_description
                        date(formatString: "MMMM D, YYYY")
                    }
                }
            }
        }
    }
`;
