exports.createSearchPage = async ({ actions, algolia }, context) => {
  const { locale, defaultLocale, pages: { 'search': pageItem } } = context;
  const {
    appID,
    searchOnlyAPIKey,
    searchIndex,
  } = algolia;
  const pageData = {
    appID,
    searchOnlyAPIKey,
    searchIndex,
  };

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../templates/SearchPage.jsx'),
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
