exports.createSupportPage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale, pages: { support: pageItem } } = context;

  const result = await graphql(`
    {
      intro: yamlSupportIntro {
        fields {
          ${locale} {
            description
            image
            title
          }
        }
      }
      offering: yamlSupportOffering {
        fields {
          ${locale} {
            title
            methods {
              content
              icon
              title
            }
          }
        }
      }
    }
  `);

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../templates/SupportPage.js'),
    context: {
      ...context,
      pageItem,
      pageData: {
        intro: result.data.intro.fields[locale],
        offering: result.data.offering.fields[locale],
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
