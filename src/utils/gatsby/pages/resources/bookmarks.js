exports.createResourcesBookmarksPage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale, pages: { 'bookmarks': pageItem } } = context;

  const result = await graphql(`
    {
      theaters: yamlResourcesTheaters {
        fields {
          ${locale} {
            list {
              title
              type
              seats
              tel
            }
          }
        }
      }
      websites: yamlResourcesWebsites {
        fields {
          ${locale} {
            list {
              title
              links {
                title
                url
              }
            }
          }
        }
      }
    }
  `);

  const pageData = {
    theaters: result.data.theaters.fields[locale].list,
    websites: result.data.websites.fields[locale].list,
  };

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../../templates/ResourcesBookmarksPage.jsx'),
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
