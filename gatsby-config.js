const camelCase = require('camelcase');

module.exports = {
  siteMetadata: {
    title: "hkbarwo.com",
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-netlify",
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-mdx",
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
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-98MB4Z0Q8N",
        ],
      },
    },
  ],
};
