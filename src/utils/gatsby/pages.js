
exports.fetchPageItems = async ({ graphql, actions }, { locale, context }) => {
  const result = await graphql(`
    {
      pages: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/data/pages/items/"}}) {
        nodes {
          fields {
            ${locale} {
              title
              description
              slug
              url
              wip
            }
          }
        }
      }
    }
  `);

  const pages = {};
  result.data.pages.nodes.forEach(({ fields: { [locale]: page } }) => {
    const localizedPath = `/${locale}${page.url}`;
    pages[page.slug] = {
      ...page,
      localizedPath,
    };
  });

  return pages;
}
