exports.createPerformancesPages = async (params, context) => {
  const { actions, graphql, md } = params;
  const { locale, defaultLocale, pages } = context;

  const result = await graphql(`
    {
      events: allMarkdownRemark(
        filter: {
          fileAbsolutePath: {regex: "/data/events/items/"}
          fields: { slug: { ne: "example" }}
        },
        sort: { fields: [fields___${locale}___date, fields___${locale}___slug], order: DESC }
      ) {
        nodes {
          fields {
            ${locale} {
              slug
              title
              date
              content
              coverImage
              metadata {
                label
                content
                isShowInList
              }
              sessions
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

  const performances = [];
  const events = [];
  const celebrations = [];
  const others = [];

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

    switch (event.type) {
      case 'performance':
        performances.push(event);
        break;
      case 'activity':
        events.push(event);
        break;
      case 'celebration':
        celebrations.push(event);
        break;
      case 'other':
        others.push(event);
        break;
      default:
        break;
    }

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

  let pageItem = pages['performances-upcoming'];

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });
  }

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../../templates/PerformancesPage.js'),
    context: {
      ...context,
      pageItem,
      pageData: {
        performances
      },
    },
  });

  pageItem = pages['performances-past'];

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });
  }

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../../templates/PerformancesPastPage.js'),
    context: {
      ...context,
      pageItem,
      pageData: {
        performances
      },
    },
  });

  pageItem = pages['events-latest'];

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });
  }

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../../templates/EventsPage.js'),
    context: {
      ...context,
      pageItem,
      pageData: {
        events
      },
    },
  });

  pageItem = pages['events-past'];

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });
  }

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../../templates/EventsPastPage.js'),
    context: {
      ...context,
      pageItem,
      pageData: {
        events
      },
    },
  });

  pageItem = pages['performances-others'];

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });
  }

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../../templates/PerformancesOthersPage.js'),
    context: {
      ...context,
      pageItem,
      pageData: {
        others
      },
    },
  });

  pageItem = pages['performances-celebrations'];

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });
  }

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../../templates/PerformancesCelebrationsPage.js'),
    context: {
      ...context,
      pageItem,
      pageData: {
        celebrations
      },
    },
  });
}
