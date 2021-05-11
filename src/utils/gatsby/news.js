
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

  result.data.categoryOrder.nodes[0].item.forEach((key, order) => {
    categoriesData[key].order = order;
  })

  return Object.keys(categoriesData).map(key => categoriesData[key]).sort(({ order: aOrder }, { order: bOrder }) => aOrder - bOrder);
}
