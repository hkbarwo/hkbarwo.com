exports.createAboutOrganizationCommitteePage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale, pages: { committee: pageItem } } = context;

  const result = await graphql(`
    {
      committee: allMarkdownRemark(
        filter: { fileAbsolutePath: {regex: "/data/about/organization/commitiees/" }},
        sort: { fields: fields___${locale}___slug, order: DESC }
      ) {
        nodes {
          fields {
            ${locale} {
              title
              slug
              period
              president {
                name
                title
                image
              }
              vicePresidents {
                name
                title
                image
              }
              groups {
                title
                commitiees {
                  name
                  title
                  image
                }
              }
            }
          }
        }
      }
    }
  `);

  const parentPath = '/about/organization';
  
  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });

    actions.createRedirect({
      fromPath: parentPath,
      toPath: `/${locale}/${parentPath}`,
    });
    actions.createRedirect({
      fromPath: `${parentPath}/`,
      toPath: `/${locale}${parentPath}/`,
    });
  }

  actions.createRedirect({
    fromPath: `/${locale}${parentPath}`,
    toPath: pageItem.localizedPath,
  });

  actions.createRedirect({
    fromPath: `/${locale}${parentPath}/`,
    toPath: pageItem.localizedPath,
  });

  result.data.committee.nodes.forEach(({ fields: { [locale]: committee } }, index) => {
    const committeePagePath = `${pageItem.localizedPath}/${committee.slug}`
    if (index === 0) {
      actions.createRedirect({
        fromPath: pageItem.localizedPath,
        toPath: committeePagePath,
      });
    }
    actions.createPage({
      path: committeePagePath,
      component: require.resolve('../../../../../templates/AboutOrganizationCommitteePage.js'),
      context: {
        ...context,
        pageItem,
        committee,
      },
    });
  })
}
