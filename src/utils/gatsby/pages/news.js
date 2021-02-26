exports.createNewsPages = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale } = context;

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
      categories: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/data/news/categories/"}}) {
        nodes {
          fields {
            ${locale} {
              title
              slug
              color
            }
          }
        }
      }
      categoryOrder: allYamlNewsCategoriesOrder {
        nodes {
          item
        }
      }
    }
  `);

  const categoriesData = {};
  const categorizedNews = {};
  result.data.categories.nodes.forEach(({ fields }) => {
    const key = fields[locale].slug;
    categoriesData[key] = fields[locale];
    categorizedNews[key] = [];
  });
  const newsCategories = result.data.categoryOrder.nodes[0].item.map((item) => categoriesData[item]);

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
        redirectInBrowser: true,
        isPermanent: true,
        force: true,
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
        redirectInBrowser: true,
        isPermanent: true,
        force: true,
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
      redirectInBrowser: true,
      isPermanent: true,
      force: true,
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
