exports.createNewsPages = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale, newsCategories } = context;

  const newsPageTemplate = require.resolve('../../../templates/NewsPage.js');
  const newsDetailsPageTemplate = require.resolve('../../../templates/NewsDetailsPage.js');

  const result = await graphql(`
    {
      news: allMarkdownRemark(filter: {
        fileAbsolutePath: {regex: "/data/news/items/"}},
        sort: {order: DESC, fields: fields___${locale}___date,
      }, limit: 1000) {
        nodes {
          fields {
            ${locale} {
              title
              slug
              date
              content
              category
              youtubeVideoID
            }
          }
        }
      }
    }
  `);

  const categoriesData = {};
  const categorizedNews = {};

  newsCategories.forEach(category => {
    categorizedNews[category.slug] = [];
    categoriesData[category.slug] = category;
  });

  const allNews = [];

  // Build news details page
  result.data.news.nodes.forEach(({ fields }) => {
    const news = fields[locale];
    const categoryKey = news.category;
    news.category = categoriesData[categoryKey];
    allNews.push(news);
    categorizedNews[categoryKey].push(news);

    const path = `/news/${news.slug}`;

    if (locale === defaultLocale) {
      actions.createRedirect({
        fromPath: path,
        toPath: `/${locale}${path}`,
      });
    }

    actions.createPage({
      path: `/${locale}${path}`,
      component: newsDetailsPageTemplate,
      context: {
        ...context,
        newsItem: news,
        newsCategories,
      },
    }); 
  });

  newsCategories.forEach((category) => {
    const path = `/news/${category.slug}`;

    if (locale === defaultLocale) {
      actions.createRedirect({
        fromPath: path,
        toPath: `/${locale}${path}`,
      });
    }

    actions.createPage({
      path: `/${locale}${path}`,
      component: newsPageTemplate,
      context: {
        ...context,
        newsItems: categorizedNews[category.slug],
        newsCategory: category,
        newsCategories,
      },
    });
  });

  const path = '/news';

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: path,
      toPath: `/${locale}${path}`,
    });
  }

  actions.createPage({
    path: `/${locale}${path}`,
    component: newsPageTemplate,
    context: {
      ...context,
      newsItems: allNews,
      newsCategories,
    },
  });
};
