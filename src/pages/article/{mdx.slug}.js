import React from "react";
import Layout from "../../components/Layout";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";

import CodeBlock from "../../components/CodeBlock";
import Header from "../../components/Header";
import ScrollToTop from "../../components/ScrollToTop";

const components = {
    pre: CodeBlock,
};

const ArticlePost = ({ data }) => {
    return (
        <Layout>
            <Helmet title={data.mdx.frontmatter.title} />
            <ScrollToTop />
            <article className="main-container">
                <Header
                    title={data.mdx.frontmatter.title}
                    description={data.mdx.frontmatter.brief_description}
                />
                <section className="post">
                    <div className="post-metadata">
                        <div className="post-modified">
                            <FaEdit />
                            <span>
                                {data.mdx.parent.modifiedTime === "0"
                                    ? "刚刚"
                                    : "编辑于 " +
                                      data.mdx.parent.modifiedTime +
                                      " 天前"}
                            </span>
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
                date(formatString: "YYYY年M月D日", locale: "zh-CN")
                brief_description
            }
            body
            parent {
                ... on File {
                    modifiedTime(locale: "zh-CN", difference: "days")
                }
            }
        }
    }
`;

export default ArticlePost;
