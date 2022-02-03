exports.createSupportSouvenirsPage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale, pages: { souvenirs: pageItem } } = context;

  const result = await graphql(`
    {
      souvenir: yamlSupportSouvenirs {
        fields {
          ${locale} {
            title
            content
            items {
              code
              image
              title
            }
          }
        }
      }
    }
  `);

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../../templates/SupportSouvenirsPage.jsx'),
    context: {
      ...context,
      pageItem,
      pageData: {
        souvenir: result.data.souvenir.fields[locale],
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
