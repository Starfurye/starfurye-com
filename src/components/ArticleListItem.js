import React from "react";
import { Link } from "gatsby";

export const ArticleListItem = ({ node, needTag, prefix }) => {
    return (
        <section className="article-list-item">
            <div className="article-list-main">
                <Link
                    to={`${prefix ? prefix + node.slug : node.slug}`}
                    key={node.id}
                >
                    {node.frontmatter.title}
                </Link>
                <span className="article-list-main-date">
                    {node.frontmatter.date}
                </span>
            </div>
            {node.frontmatter.brief_description && (
                <p>{node.frontmatter.brief_description}</p>
            )}
        </section>
    );
};
