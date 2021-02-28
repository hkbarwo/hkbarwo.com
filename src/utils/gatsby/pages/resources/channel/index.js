exports.createResourcesChannelPages = async (params, context) => {
  const { actions, graphql } = params;
  const { locale, defaultLocale } = context;

  const result = await graphql(`
    {
      items: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/data/resources/channel/items/"}},
        sort: { fields: [fields___${locale}___date, fields___${locale}___slug], order: DESC }
      ) {
        nodes {
          fields {
            ${locale} {
              slug
              title
              youtubeVideoID
              category
              content
              image
              date
            }
          }
        }
      }
    }
  `);

  result.data.items.nodes.forEach(({ fields: { [locale]: item } }) => {
    const path = `/resources/channel/${item.category}/${item.slug}`;

    if (locale === defaultLocale) {
      actions.createRedirect({
        fromPath: path,
        toPath: `/${locale}${path}`,
        redirectInBrowser: true,
        isPermanent: true,
        force: true,
      });
    }

    actions.createPage({
      path: `/${locale}${path}`,
      component: require.resolve('../../../../../templates/ResourcesChannelDetailsPage.js'),
      context: {
        ...context,
        pageData: item,
      },
    });
  });
}
