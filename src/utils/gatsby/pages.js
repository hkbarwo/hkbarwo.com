
exports.fetchPageItems = async ({ graphql }, { locale }) => {
  const result = await graphql(`
    {
      pages: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/data/pages/items/"}}) {
        nodes {
          fields {
            ${locale} {
              title
              slug
              url
            }
          }
        }
      }
    }
  `);

  const pages = {};
  result.data.pages.nodes.forEach(({ fields }) => {
    pages[fields[locale].slug] = fields[locale];
  });

  return pages;
}
