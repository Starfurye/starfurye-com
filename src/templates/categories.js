import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import { Header } from "../components/header";
import { ArticleListItem } from "../components/ArticleListItem";

const Categories = ({ pageContext, data }) => {
    const { category } = pageContext;
    const { edges, totalCount } = data.allMdx;
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
                    {/* {edges.map(({ node }) => {
                        const slug = node.slug;
                        const { title } = node.frontmatter;
                        return (
                            <li key={slug}>
                                <Link to={`/article/${slug}`}>{title}</Link>
                            </li>
                        );
                    })} */}
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
                        date(formatString: "MMMM D, YYYY")
                    }
                }
            }
        }
    }
`;
