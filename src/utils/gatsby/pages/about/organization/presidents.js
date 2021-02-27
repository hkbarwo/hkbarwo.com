exports.createAboutOrganizationPresidentsPage = async ({ actions, graphql }, context) => {
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
  
  const path = '/about/organization/presidents';

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
    component: aboutPageTemplate,
    context: {
      ...context,
      // pageData,
    },
  });
}
