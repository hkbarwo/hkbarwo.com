
exports.fetchNewsCategories = async ({ graphql }, { locale }) => {
  const result = await graphql(`
    {
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
  result.data.categories.nodes.forEach(({ fields }) => {
    const key = fields[locale].slug;
    categoriesData[key] = fields[locale];
  });

  return result.data.categoryOrder.nodes[0].item.map((item) => categoriesData[item]);
}
