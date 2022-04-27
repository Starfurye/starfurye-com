import React from "react";
import kekabCase from "lodash/kebabCase";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Header from "../components/Header";
import Helmet from "react-helmet";

const CategoriesPage = ({
    data: {
        allMdx: { group },
    },
}) => (
    <Layout>
        <Helmet title="Categories" />
        <article className="main-container">
            <Header
                title="Categories"
                description="All categories"
                isCenter={false}
            />
            <section>
                <ul>
                    {group.map((category) => (
                        <li key={category.fieldValue}>
                            <Link
                                to={`/categories/${kekabCase(
                                    category.fieldValue
                                )}/`}
                            >
                                {category.fieldValue} ({category.totalCount})
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    </Layout>
);

export default CategoriesPage;

export const categoryPageQuery = graphql`
    query {
        allMdx(limit: 2000) {
            group(field: frontmatter___categories) {
                fieldValue
                totalCount
            }
        }
    }
`;
