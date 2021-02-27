exports.createAboutOrganizationPresidentsPage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale } = context;

  const result = await graphql(`
    {
      presidents: yamlAboutOrganizationCommitieesPresidents {
        fields {
          ${locale} {
            list {
              image
              name
              title
            }
          }
        }
      }
      vicePresidents: yamlAboutOrganizationCommitieesVicePresidents {
        fields {
          ${locale} {
            list {
              image
              name
              title
            }
          }
        }
      }
    }
  `);

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
    component: require.resolve('../../../../../templates/AboutOrganizationPresidentsPage.js'),
    context: {
      ...context,
      presidents: result.data.presidents.fields[locale].list,
      vicePresidents: result.data.vicePresidents.fields[locale].list,
    },
  });
}
