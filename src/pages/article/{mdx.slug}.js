import React from "react";
import Layout from "../../components/layout";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

import CodeBlock from "../../components/CodeBlock";
import { Header } from "../../components/header";

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
                    <span className="post-date">
                        {data.mdx.frontmatter.date}
                    </span>

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
        }
    }
`;

export default ArticlePost;
