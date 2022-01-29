exports.createResourcesEbooksPage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale, pages: { 'ebook': pageItem } } = context;

  const result = await graphql(`
    {
      items: allMarkdownRemark(
        filter: {
          fileAbsolutePath: {regex: "/data/resources/ebook/items/"},
          fields: { slug: { ne: "example" } }
        },
        sort: {fields: fields___zh___date, order: DESC}
      ) {
        nodes {
          fields {
            ${locale} {
              slug
              title
              image
              date
              url
            }
          }
        }
      }
    }
  `);

  const pageData = {
    ebooks: result.data.items.nodes.map(({ fields: { [locale]: item } }) => item),
  };

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../../templates/ResourcesEbooksPage.jsx'),
    context: {
      ...context,
      pageItem,
      pageData,
    },
  });

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });
  }
};
