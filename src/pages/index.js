import React from "react";
import { Link, graphql } from "gatsby";
import configs from "../utils/configs";
import Helmet from "react-helmet";
import Layout from "../components/Layout";
import WideHeader from "../components/WideHeader";
import { ArticleListItem } from "../components/ArticleListItem";

const IndexPage = ({ data }) => {
    return (
        <Layout>
            <Helmet title={configs.siteTitle} />
            <WideHeader
                title="Starfurye"
                backImgUrl={"https://i.loli.net/2020/06/05/MgJDtP1uNGdZ8Lf.jpg"}
            />
            <article className="main-container">
                <h2 className="section-header">
                    <span>最近的创作</span>
                    <Link to="/article">All</Link>
                </h2>
                {data.latest.nodes.map((node) => (
                    <ArticleListItem node={node} prefix={"/article/"} />
                ))}
            </article>
        </Layout>
    );
};

export default IndexPage;

export const IndexPageQuery = graphql`
    query {
        latest: allMdx(
            limit: 5
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            nodes {
                frontmatter {
                    date(formatString: "MMMM D, YYYY")
                    title
                    categories
                }
                slug
                id
            }
        }
    }
`;
