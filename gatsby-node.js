const path = require("path");
const _ = require("lodash");

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;
    const categoryTemplate = path.resolve("src/templates/categories.js");
    const result = await graphql(`
        {
            categoriesGroup: allMdx(limit: 2000) {
                group(field: frontmatter___categories) {
                    fieldValue
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    const categories = result.data.categoriesGroup.group;
    categories.forEach((category) => {
        createPage({
            path: `/categories/${_.kebabCase(category.fieldValue)}/`,
            component: categoryTemplate,
            context: {
                category: category.fieldValue,
            },
        });
    });
};
