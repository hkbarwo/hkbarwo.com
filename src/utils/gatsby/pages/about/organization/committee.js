exports.createAboutOrganizationCommitteePage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale } = context;

  const result = await graphql(`
    {
      committee: allMarkdownRemark(
        filter: { fileAbsolutePath: {regex: "/data/about/organization/commitiees/" }},
        sort: { fields: fields___${locale}___slug, order: DESC }
        limit: 1
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
  
  const path = `${parentPath}/committee`;

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: path,
      toPath: `/${locale}${path}`,
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
    toPath: `/${locale}${path}`,
  });

  actions.createRedirect({
    fromPath: `/${locale}${parentPath}/`,
    toPath: `/${locale}${path}`,
  });

  actions.createPage({
    path: `/${locale}${path}`,
    component: require.resolve('../../../../../templates/AboutOrganizationCommitteePage.js'),
    context: {
      ...context,
      committee: result.data.committee.nodes[0].fields[locale],
    },
  });
}
