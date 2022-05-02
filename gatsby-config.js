module.exports = {
    siteMetadata: {
        title: `Starfurye`,
        siteUrl: `https://www.yourdomain.tld`,
    },
    plugins: [
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: `article`,
                path: `${__dirname}/article`,
            },
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                remarkPlugins: [require("remark-math")],
                rehypePlugins: [
                    [require("rehype-katex"), { strict: "ignore" }],
                ],
            },
        },
        "gatsby-transformer-sharp",
    ],
};
