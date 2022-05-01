import React from "react";
import Layout from "../../components/Layout";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";

import CodeBlock from "../../components/CodeBlock";
import Header from "../../components/Header";

const components = {
    pre: CodeBlock,
};

const ArticlePost = ({ data }) => {
    return (
        <Layout>
            <Helmet title={data.mdx.frontmatter.title} />
            <article className="main-container">
                <Header
                    title={data.mdx.frontmatter.title}
                    description={data.mdx.frontmatter.brief_description}
                />
                <section className="post">
                    <div className="post-metadata">
                        <div className="post-modified">
                            <FaEdit />
                            <span>{data.mdx.parent.modifiedTime}</span>
                        </div>
                        <span className="post-date">
                            {data.mdx.frontmatter.date}
                        </span>
                    </div>

                    <MDXProvider components={components}>
                        <MDXRenderer>{data.mdx.body}</MDXRenderer>
                    </MDXProvider>
                </section>
            </article>
        </Layout>
    );
};

export const query = graphql`
    query ($id: String) {
        mdx(id: { eq: $id }) {
            frontmatter {
                title
                date(formatString: "MMMM D, YYYY")
                brief_description
            }
            body
            parent {
                ... on File {
                    modifiedTime(fromNow: true, locale: "zh-CN")
                }
            }
        }
    }
`;

export default ArticlePost;
