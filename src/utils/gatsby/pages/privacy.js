exports.createPrivacyPage = async ({ actions, graphql, md }, context) => {
  const { locale, defaultLocale, pages: { 'privacy': pageItem } } = context;

  const result = await graphql(`
    {
      page: yamlSitePrivacy {
        fields {
          ${locale} {
            content
          }
        }
      }
    }
  `);

  const pageData = {
    content: md.render(result.data.page.fields[locale].content),
  };

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../templates/MarkdownContentPage.jsx'),
    context: {
      ...context,
      pageItem,
      pageData,
    },
  });

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });
  }
};
