
exports.fetchPageItems = async ({ graphql, actions }, { locale, context }) => {
  const result = await graphql(`
    {
      pages: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/data/pages/items/"}}) {
        nodes {
          fields {
            ${locale} {
              title
              description
              slug
              url
              wip
              subPages
            }
          }
        }
      }
    }
  `);

  const pages = {};
  result.data.pages.nodes.forEach(({ fields: { [locale]: page } }) => {
    const localizedPath = `/${locale}${page.url}`;
    pages[page.slug] = {
      ...page,
      localizedPath,
    };
  });

  Object.keys(pages).forEach(slug => {
    if (pages[slug].subPages && pages[slug].subPages.length) {
      pages[slug].subPages.forEach(subSlug => {
        if (pages[subSlug]) {
          pages[subSlug].parentPage = slug;
        }
      });
    }
  });

  Object.keys(pages).forEach(slug => {
    if (pages[slug].subPages && pages[slug].subPages.length) {
      pages[slug].subPages = pages[slug].subPages.map(subSlug => pages[subSlug]);
    }
  });

  return pages;
}
