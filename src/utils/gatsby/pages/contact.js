exports.createContactPage = async ({ actions }, context) => {
  const { locale, defaultLocale, pages: { contact: pageItem } } = context;

  console.log(pageItem);

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../templates/ContactPage.js'),
    context: {
      ...context,
      pageItem,
    },
  });

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });
  }
};
