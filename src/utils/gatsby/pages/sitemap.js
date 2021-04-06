exports.createSitemapPage = async ({ actions, graphql }, context) => {
  const {
    locale,
    defaultLocale,
    pages: { sitemap: pageItem },
    menus,
  } = context;

  const sitemap = {};

  function getMenuItem(item) {
    let subPages;

    switch (item.slug) {
      case 'news': {
        const { newsCategories = [] } = context;
        subPages = newsCategories.map(({ slug, title }) => ({
          slug,
          title,
          localizedPath: `/${locale}/news/${slug}`
        }));
        break;
      }

      case 'associations': {
        const { associations = [] } = context;
        subPages = associations.map(({ slug, shortTitle: title, localizedPath }) => ({
          slug,
          title,
          localizedPath,
        }));
        break;
      }

      case 'channel': {
        const { channelCategories = [] } = context;
        subPages = channelCategories.map(({ slug, title }) => ({
          slug,
          title,
          localizedPath: `/${locale}/resources/channel/${slug}`,
        }));
        break;
      }

      case 'interviews': {
        const { interviewCategories = [] } = context;
        subPages = interviewCategories.map(({ slug, title }) => ({
          slug,
          title,
          localizedPath: `/${locale}/about/interviews/${slug}`,
        }));
        break;
      }
    
      default: {
        if (item.subPages && item.subPages.length) {
          subPages = item.subPages.map(getMenuItem);
        }
      }
    }
  
    return {
      ...item,
      subPages,
    };
  }

  if (menus.primary) {
    sitemap.primary = menus.primary;
  }

  if (menus.secondary) {
    sitemap.secondary = menus.secondary.map(getMenuItem);
  }

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../templates/SitemapPage.jsx'),
    context: {
      ...context,
      pageItem,
      pageData: {
        sitemap,
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
