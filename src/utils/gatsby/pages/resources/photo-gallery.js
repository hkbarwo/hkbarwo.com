exports.createResourcesPhotoGalleryPage = async ({ actions, graphql }, { ...context }) => {
  const { locale, defaultLocale, pages: { 'photo-gallery': pageItem } } = context;

  const result = await graphql(`
    {
      items: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/data/resources/photo-gallery/items/"}},
        sort: {fields: fields___zh___date, order: DESC}) {
        nodes {
          fields {
            ${locale} {
              slug
              title
              description
              image
              date
            }
          }
        }
      }
    }
  `);

  const pageData = {
    galleryPhotos: result.data.items.nodes.map(({ fields: { [locale]: item } }) => item),
  };

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../../templates/ResourcesPhotoGalleryPage.jsx'),
    context: {
      ...context,
      pageItem,
      pageData,
    },
  });

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });
  }
};
