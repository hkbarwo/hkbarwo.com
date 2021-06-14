exports.createInterviewsPages = async ({ actions, graphql, md }, context) => {
  const { locale, defaultLocale, pages: { 'interviews': pageItem } } = context;

  const result = await graphql(`
    {
      categoryOrder: yamlAboutInterviewsCategoriesOrder {
        item
      }
      categories: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/data/about/interviews/categories/"}},
        sort: {fields: fields___zh___date, order: DESC}
      ) {
        nodes {
          fields {
            ${locale} {
              slug
              title
              articleTitle
              articleContent
              articlePhotosTitle
              articlePhotos {
                image
                caption
              }
            }
          }
        }
      }
    }  
  `);

  const categoryMap = {}
  result.data.categories.nodes.forEach(({ fields: { [locale]: { ...category } } }) => {
    category.url = `${pageItem.url}/${category.slug}`;
    category.localizedPath = `${pageItem.localizedPath}/${category.slug}`;
    category.articleContent = md.render(category.articleContent);
    categoryMap[category.slug] = category;
  });

  const categories = result.data.categoryOrder.item.map(slug => categoryMap[slug]);
  categories.forEach((category, i) => {
    actions.createPage({
      path: category.localizedPath,
      component: require.resolve('../../../../templates/InterviewCategoryPage.jsx'),
      context: {
        ...context,
        pageItem,
        pageData: {
          interviewCategories: categories,
          interviewCategory: category,
        },
      },
    });

    if (locale === defaultLocale) {
      actions.createRedirect({
        fromPath: category.url,
        toPath: category.localizedPath,
      });
    }

    if (i === 0) {
      actions.createRedirect({
        fromPath: pageItem.url,
        toPath: category.localizedPath,
      });
      actions.createRedirect({
        fromPath: pageItem.localizedPath,
        toPath: category.localizedPath,
      });
    }
  });

  return Promise.resolve({ categories });
}
