exports.createResourcesPublicationsPage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale, pages: { 'publications': pageItem } } = context;

  const result = await graphql(`
    {
      items: allMarkdownRemark(
        filter: {
          fileAbsolutePath: {regex: "/data/resources/publications/items/"},
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
              pdf
            }
          }
        }
      }
    }
  `);

  const pageData = {
    publications: result.data.items.nodes.map(({ fields: { [locale]: item } }) => item),
  };

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../../templates/ResourcesPublicationsPage.jsx'),
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
