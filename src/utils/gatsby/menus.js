
exports.fetchMenus = async ({ graphql }, { locale }) => {
  const result = await graphql(`
    {
      menus: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/data/menu/"}, frontmatter: {id: {regex: "/.*/"}}}) {
        edges {
          node {
            frontmatter {
              id
              items {
                style
                item
              }
            }
          }
        }
      }
      menuItems: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/data/menu/items/"}}) {
        edges {
          node {
            fields {
              slug
              ${locale} {
                title
              }
            }
          }
        }
      }
    }
  `);

  const menuItems = {};
  result.data.menuItems.edges.forEach(({ node: { fields } }) => {
    menuItems[fields.slug] = fields;
  });

  const menus = {};
  result.data.menus.edges.forEach(({ node: { frontmatter: { id, items } } }) => {
    menus[id] = items.map(({ style, item: slug }) => ({
      ...menuItems[slug][locale],
      slug,
      style,
    }));
  });

  return menus;
}
