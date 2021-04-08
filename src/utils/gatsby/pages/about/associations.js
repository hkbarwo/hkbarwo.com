exports.createAboutAssociationPages = async (params, context) => {
  const { actions, graphql } = params;
  const { locale, defaultLocale, pages: { associations: pageItem } } = context;

  const result = await graphql(`
    {
      # Fetch only Chinese
      order: yamlAboutAssociations {
        zh {
          list: order
        }
      }
      items: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/data/about/associations/" },
          fields: { slug: { ne: "example" } }
        }
      ) {
        nodes {
          fields {
            ${locale} {
              slug
              title
              shortTitle
              description
              commitieesTitle
              commitiees {
                name
                title
              }
              logo
              logoWhite
              website
            }
          }
        }
      }
    }
  `);

  const associations = {};
  result.data.items.nodes.forEach(({ fields: { [locale]: association } }) => {
    const path =`${pageItem.url}/${association.slug}`;
    const localizedPath = `${pageItem.localizedPath}${path}`;
    associations[association.slug] = {
      ...association,
      path,
      localizedPath,
    };
  });

  const menus = result.data.order.zh.list.map(slug => {
    const { title, shortTitle, path, localizedPath, logoWhite } = associations[slug];
    return {
      slug,
      title,
      shortTitle,
      path,
      localizedPath,
      logoWhite,
    };
  });


  menus.forEach(({ slug, path, localizedPath }) => {
    if (locale === defaultLocale) {
      actions.createRedirect({
        fromPath: path,
        toPath: localizedPath,
      });
    }

    actions.createPage({
      path: localizedPath,
      component: require.resolve('../../../../templates/AboutAssociationPage.js'),
      context: {
        ...context,
        subMenus: menus,
        pageData: associations[slug],
        pageItem,
      },
    });
  });

  if (menus.length) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: menus[0].localizedPath,
    });
  }

  return { menus };
}
