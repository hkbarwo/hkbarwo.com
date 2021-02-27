exports.createAboutOrganizationCommitteePage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale } = context;

  const aboutPageTemplate = require.resolve('../../../../../templates/AboutPage.js');

  // const result = await graphql(`
  //   {
  //     page: yamlAboutOrganizationAdvisors {
  //       fields {
  //         ${locale} {
  //           groups {
  //             list {
  //               name
  //               title
  //             }
  //             title
  //           }
  //         }
  //       }
  //     }
  //   }
  // `);

  // const pageData = result.data.page.fields[locale];

  const parentPath = '/about/organization';
  
  const path = `${parentPath}/committee`;

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: path,
      toPath: `/${locale}${path}`,
      redirectInBrowser: true,
      isPermanent: true,
      force: true,
    });

    actions.createRedirect({
      fromPath: parentPath,
      toPath: `/${locale}/${parentPath}`,
      redirectInBrowser: true,
      isPermanent: true,
      force: true,
    });
    actions.createRedirect({
      fromPath: `${parentPath}/`,
      toPath: `/${locale}${parentPath}/`,
      redirectInBrowser: true,
      isPermanent: true,
      force: true,
    });
  }

  actions.createRedirect({
    fromPath: `/${locale}${parentPath}`,
    toPath: `/${locale}${path}`,
    redirectInBrowser: true,
    isPermanent: true,
    force: true,
  });

  actions.createRedirect({
    fromPath: `/${locale}${parentPath}/`,
    toPath: `/${locale}${path}`,
    redirectInBrowser: true,
    isPermanent: true,
    force: true,
  });

  actions.createPage({
    path: `/${locale}${path}`,
    component: aboutPageTemplate,
    context: {
      ...context,
      // pageData,
    },
  });
}
