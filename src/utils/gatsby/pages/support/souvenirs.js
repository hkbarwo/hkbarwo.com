exports.createSupportSouvenirsPage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale, pages: { souvenirs: pageItem } } = context;

  const pageResult = await graphql(`
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
    }
  `);

  const pageData = {
    ...pageResult.data.page.fields[locale],
  };

  let itemsResult = await graphql(`
    {
      items: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/data/support/souvenirs/"}},
        limit: 1000,
        sort: {order: ASC, fields: frontmatter___zh___slug}
      ) {
        nodes {
          id
        }
      }
    }
  `);
  if (itemsResult.data.items.nodes.length) {
    itemsResult = await graphql(`
      {
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
                gallery
                price
              }
            }
          }
        }
      }
    `);
    pageData.items = itemsResult.data.items.nodes.map(({ fields: { [locale]: item } }) => item)
  } else {
    pageData.items = [];
  }

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
