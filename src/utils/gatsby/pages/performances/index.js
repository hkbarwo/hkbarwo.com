exports.createPerformancesPages = async (params, context) => {
  const { actions, graphql, md } = params;
  const { locale, defaultLocale } = context;

  const result = await graphql(`
    {
      events: allMarkdownRemark(
        filter: {
          fileAbsolutePath: {regex: "/data/events/items/"}
        },
        sort: { fields: [fields___${locale}___date, fields___${locale}___slug], order: DESC }
      ) {
        nodes {
          fields {
            ${locale} {
              slug
              title
              content
              coverImage
              metadata {
                label
                content
              }
              type
              tel
              email
              location
              photos
              youtubeVideoID
            }
          }
        }
      }
    }
  `);

  result.data.events.nodes.forEach(({ fields: { [locale]: event } }) => {
    const path = `/${event.type === 'event' ? 'events' : 'performances'}/${event.slug}`;
    const localizedPath = `/${locale}${path}`;

    event.metadata = event.metadata.map(({ content, ...data}) => {
      return {
        content: md.render(content),
        ...data,
      };
    })

    event.content = md.render(event.content);

    event.path = path;
    event.localizedPath = localizedPath;

    if (locale === defaultLocale) {
      actions.createRedirect({
        fromPath: path,
        toPath: localizedPath,
      });
    }

    actions.createPage({
      path: localizedPath,
      component: require.resolve('../../../../templates/PerformancesDetailsPage.js'),
      context: {
        ...context,
        pageData: event,
      },
    });
  });
}
