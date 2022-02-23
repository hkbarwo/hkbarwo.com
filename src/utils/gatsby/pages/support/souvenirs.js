exports.createSupportSouvenirsPage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale, pages: { souvenirs: pageItem } } = context;

  const result = await graphql(`
    {
      page: yamlSupportSouvenirs {
        fields {
          ${locale} {
            title
            contentTitle
            content
          }
        }
      }
      items: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/data/support/souvenirs/"}},
        limit: 1000,
        sort: {order: ASC, fields: frontmatter___zh___slug}
      ) {
        nodes {
          fields {
            ${locale} {
              slug
              title
              thumbnail
              banner
              images
              price
            }
          }
        }
      }
    }
  `);

  const pageData = {
    ...result.data.page.fields[locale],
    items: result.data.items.nodes.map(({ fields: { [locale]: item } }) => item)
  };

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../../templates/SupportSouvenirsPage.jsx'),
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
