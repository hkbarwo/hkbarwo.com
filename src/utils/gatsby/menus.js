const { getNavLink } = require('../link');

exports.fetchMenus = async ({ graphql }, { locale, pages }) => {
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
        nodes {
          fields {
            slug
            ${locale} {
              slug
              title
              page
              subPages
            }
          }
        }
      }
    }
  `);

  const menuItems = {};
  result.data.menuItems.nodes.forEach(({ fields }) => {
    const item = { ...fields[locale] };
    if (item.page) {
      item.page = pages[item.page];
    }
    if (item.subPages && item.subPages.length) {
      item.subPages = item.subPages.map(page => pages[page])
    }
    if (!item.url) {
      item.url = getNavLink(locale, item);
    }
    menuItems[item.slug] = item;
  });

  const menus = {};
  result.data.menus.edges.forEach(({ node: { frontmatter: { id, items } } }) => {
    menus[id] = items.map(({ style, item: slug }) => ({
      ...menuItems[slug],
      slug,
      style,
    }));
  });

  return menus;
}
