import React from "react";
import { Link } from "gatsby";

export const ArticleListItem = ({ node }) => {
    return (
        <section className="article-list-item">
            <div className="article-list-main">
                <Link to={node.slug} key={node.id}>
                    {node.frontmatter.title}
                </Link>
                <span className="article-list-main-date">
                    {node.frontmatter.date}
                </span>
            </div>
            <p>{node.frontmatter.brief_description}</p>
        </section>
    );
};
