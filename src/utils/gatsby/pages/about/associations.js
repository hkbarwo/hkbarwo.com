exports.createAboutAssociationPages = async (params, context) => {
  const { actions, graphql } = params;
  const { locale, defaultLocale } = context;

  const result = await graphql(`
    {
      # Fetch only Chinese
      order: yamlAboutAssociations {
        zh {
          list: order
        }
      }
      items: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/data/about/organization/associations/"}}) {
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
            }
          }
        }
      }
    }
  `);

  const indexPath = '/about/associations';

  const associations = {};
  result.data.items.nodes.forEach(({ fields: { [locale]: association } }) => {
    const path =`${indexPath}/${association.slug}`;
    const localizedPath = `/${locale}${path}`;
    associations[association.slug] = {
      ...association,
      path,
      localizedPath,
    };
  });

  const menus = result.data.order.zh.list.map(slug => {
    const { title, shortTitle, path, localizedPath } = associations[slug];
    return {
      slug,
      title,
      shortTitle,
      path,
      localizedPath,
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
      },
    });
  });

  if (menus.length) {
    actions.createRedirect({
      fromPath: indexPath,
      toPath: menus[0].localizedPath,
    });
  }
}
