exports.createAboutOrganizationAdvisorsPage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale } = context;

  const result = await graphql(`
    {
      page: yamlAboutOrganizationAdvisors {
        fields {
          ${locale} {
            title
            groups {
              list {
                name
                title
              }
              title
            }
          }
        }
      }
    }
  `);

  const pageData = result.data.page.fields[locale];
  
  const path = '/about/organization/advisors';

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: path,
      toPath: `/${locale}${path}`,
    });
  }

  actions.createPage({
    path: `/${locale}${path}`,
    component: require.resolve('../../../../../templates/AboutOrganizationAdvisorsPage.js'),
    context: {
      ...context,
      pageData,
    },
  });
}
