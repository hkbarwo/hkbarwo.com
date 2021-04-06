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
              color
            }
          }
        }
      }
      items: allMarkdownRemark(
        filter: {
          fileAbsolutePath: {regex: "/data/about/interviews/items/"}
          fields: { slug: { ne: "example" }}
        },
        sort: {fields: fields___zh___date, order: DESC}
      ) {
        nodes {
          fields {
            ${locale} {
              slug
              title
              date
              category
              coverImage
              description
              sections {
                content
                layout
                images
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
    categoryMap[category.slug] = category;
  });

  const categorizedItems = {};

  result.data.items.nodes.forEach(({ fields: { [locale]: item } }) => {
    const interview = { ...item };
    const { category } = interview;

    if (!categorizedItems[category]) {
      categorizedItems[category] = [];
    }

    interview.category = categoryMap[category];

    interview.url = `${interview.category.url}/${interview.slug}`;
    interview.localizedPath = `${interview.category.localizedPath}/${interview.slug}`;

    interview.sections = interview.sections.map(section => {
      section.content = md.render(section.content);
      return section;
    });

    categorizedItems[category].push(interview);

    actions.createPage({
      path: interview.localizedPath,
      component: require.resolve('../../../../templates/InterviewDetailsArticlePage.jsx'),
      context: {
        ...context,
        pageItem,
        pageData: {
          interview,
        },
      },
    });

    if (locale === defaultLocale) {
      actions.createRedirect({
        fromPath: interview.url,
        toPath: interview.localizedPath,
      });
    }
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
          interviews: categorizedItems[category.slug],
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
