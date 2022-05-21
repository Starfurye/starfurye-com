module.exports = {
    siteMetadata: {
        title: `Starfurye`,
        siteUrl: `https://www.starfurye.com`,
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
            resolve: "gatsby-source-filesystem",
            options: {
                name: `image`,
                path: `${__dirname}/image`,
            },
        },
        "gatsby-remark-images",
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                remarkPlugins: [require("remark-math")],
                rehypePlugins: [
                    [require("rehype-katex"), { strict: "ignore" }],
                ],
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 900,
                        },
                    },
                    {
                        resolve: "gatsby-remark-autolink-headers",
                        options: {
                            className: `header-anchor`,
                        },
                    },
                ],
            },
        },
        "gatsby-transformer-sharp",
    ],
};
