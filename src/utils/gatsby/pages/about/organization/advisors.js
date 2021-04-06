exports.createAboutOrganizationAdvisorsPage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale, pages: { advisors: pageItem } } = context;

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

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });
  }

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../../../templates/AboutOrganizationAdvisorsPage.js'),
    context: {
      ...context,
      pageData,
      pageItem,
    },
  });
}
