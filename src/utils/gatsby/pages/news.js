const cheerio = require('cheerio');

exports.createNewsPages = async ({ actions, graphql, md, algolia }, context) => {
  const { locale, defaultLocale, newsCategories, pages: { news: pageItem } } = context;

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
              pdfFile
              images
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

  const algoliaObjects = [];

  // Build news details page
  result.data.news.nodes.forEach(({ fields }) => {
    const news = fields[locale];
    const categoryKey = news.category;
    news.category = categoriesData[categoryKey];
    news.content = md.render(news.content);
    allNews.push(news);
    categorizedNews[categoryKey].push(news);

    const path = `${pageItem.url}/${news.slug}`;
    const localizedPath = `${pageItem.localizedPath}/${news.slug}`;

    if (locale === defaultLocale) {
      actions.createRedirect({
        fromPath: path,
        toPath: localizedPath,
      });
    }

    actions.createPage({
      path: localizedPath,
      component: newsDetailsPageTemplate,
      context: {
        ...context,
        pageItem,
        newsItem: news,
        newsCategories,
      },
    });

    const $ = cheerio.load(news.content, null, false);
    const paragraphs = $('p');
    for (let i = 0; i < paragraphs.length; i++) {
      algoliaObjects.push({
        objectID: `${locale}-news-${news.slug}-${i}`,
        pageName: pageItem.title,
        name: news.title,
        content: $(paragraphs[i]).text(),
        permalink: localizedPath,
        locale: locale,
      });
    }
  });

  algolia.saveObjects(algoliaObjects);

  newsCategories.forEach((category) => {
    const path = `${pageItem.url}/${category.slug}`;
    const localizedPath = `${pageItem.localizedPath}/${category.slug}`;
    if (locale === defaultLocale) {
      actions.createRedirect({
        fromPath: path,
        toPath: localizedPath,
      });
    }

    actions.createPage({
      path: localizedPath,
      component: newsPageTemplate,
      context: {
        ...context,
        pageItem,
        newsItems: categorizedNews[category.slug],
        newsCategory: category,
        newsCategories,
      },
    });
  });

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });
  }

  actions.createPage({
    path: pageItem.localizedPath,
    component: newsPageTemplate,
    context: {
      ...context,
      pageItem,
      newsItems: allNews,
      newsCategories,
    },
  });
};
