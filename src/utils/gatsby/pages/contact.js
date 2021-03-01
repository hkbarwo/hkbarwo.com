exports.createContactPage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale, pages: { contact: pageItem } } = context;

  const path = '/contact';
  const localizedPath = `/${locale}${path}`;

  actions.createPage({
    path: localizedPath,
    component: require.resolve('../../../templates/ContactPage.js'),
    context: {
      ...context,
      pageItem,
    },
  });

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: path,
      toPath: localizedPath,
    });
  }
};
