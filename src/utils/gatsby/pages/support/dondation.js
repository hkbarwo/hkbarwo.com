exports.createSupportDonationPage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale, pages: { donation: pageItem } } = context;

  const result = await graphql(`
    {
      intro: yamlSupportIntro {
        fields {
          ${locale} {
            heading
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
      credits: yamlSupportCredits {
        fields {
          ${locale} {
            title
            items
          }
        }
      }
    }
  `);

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../../templates/SupportIndexPage.jsx'),
    context: {
      ...context,
      pageItem,
      pageData: {
        intro: result.data.intro.fields[locale],
        offering: result.data.offering.fields[locale],
        credits: result.data.credits.fields[locale],
      },
    },
  });

  actions.createRedirect({
    fromPath: `/${locale}/support`,
    toPath: pageItem.localizedPath,
  });

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: '/support',
      toPath: pageItem.localizedPath,
    });
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });
  }
};
