exports.createMemberEventsPage = async ({ actions, graphql, md }, context) => {
  const { locale, defaultLocale, pages: { 'member-events': pageItem } } = context;

  const result = await graphql(`
    {
      events: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/data/member/events/"}},
        sort: { fields: [fields___${locale}___date, fields___${locale}___slug], order: ASC }
      ) {
        nodes {
          fields {
            ${locale} {
              slug
              title
              metadata {
                label
                content
              }
            }
          }
        }
      }
    }
  `);
  
  const events = result.data.events.nodes.map(({ fields: { [locale]: event }}) => {
    const metadata = event.metadata.map(({ content, ...data}) => {
      return {
        content: md.render(content),
        ...data,
      }
    })
    return { ...event, metadata };
  });

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../../templates/MemberEventsPage.js'),
    context: {
      ...context,
      pageItem,
      pageData: {
        events,
      },
    },
  });

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });
  }
};
