exports.createAboutOrganizationPresidentsPage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale, pages: { presidents: pageItem } } = context;

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
  
  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });
  }

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../../../templates/AboutOrganizationPresidentsPage.js'),
    context: {
      ...context,
      pageItem,
      presidents: result.data.presidents.fields[locale].list,
      vicePresidents: result.data.vicePresidents.fields[locale].list,
    },
  });
}
