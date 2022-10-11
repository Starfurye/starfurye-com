import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Helmet from "react-helmet";

import CategoryListItem from "../components/CategoryListItem";

const colorsPool = [
    "#53b3cb",
    "#F9C22E",
    "#F15946",
    "#E01A4F",
    "#FCDFA6",
    "#A18276",
    "#B8DBD9",
    "#3C887E",
    "#7D387D",
];

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
                    {group.map((category, index) => (
                        <li key={category.fieldValue}>
                            {/* <Link
                                to={`/categories/${kekabCase(
                                    category.fieldValue
                                )}/`}
                            >
                                {category.fieldValue} ({category.totalCount})
                            </Link> */}
                            <CategoryListItem
                                link={`/categories/${category.fieldValue.toLowerCase()}/`}
                                categoryName={category.fieldValue}
                                count={category.totalCount}
                                color={colorsPool[index]}
                            />
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
