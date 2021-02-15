const camelCase = require('camelcase');

module.exports = {
  siteMetadata: {
    title: "hkbarwo.com",
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-mdx",
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./data/`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: ({ node }) => {
          // Convert type name to yaml[path][filename] in camel case
          return camelCase(`yaml ${node.relativeDirectory.replace(/\//g, ' ')} ${node.name}`);
        },
      },
    },
  ],
};
