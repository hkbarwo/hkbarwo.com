exports.createResourcesChannelPages = async (params, context) => {
  const { actions, graphql } = params;
  const { locale, defaultLocale } = context;

  const result = await graphql(`
    {
      common: yamlResourcesChannelConfig {
        fields {
          ${locale} {
            categories
            description
            title
            logo
            youtubeLink
          }
        }
      }
      categories: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/data/resources/channel/categories/"}},
      ) {
        nodes {
          fields {
            ${locale} {
              slug
              title
            }
          }
        }
      }
      items: allMarkdownRemark(
        filter: {fileAbsolutePath: {regex: "/data/resources/channel/items/"}},
        sort: { fields: [fields___${locale}___date, fields___${locale}___slug], order: DESC }
      ) {
        nodes {
          fields {
            ${locale} {
              slug
              title
              youtubeVideoID
              category
              content
              coverImage
              date
            }
          }
        }
      }
    }
  `);

  const common = result.data.common.fields[locale];

  const indexPath = '/resources/channel';

  const categoryData = {};
  result.data.categories.nodes.forEach(({ fields: { [locale]: category }}) => {
    const path = `${indexPath}/${category.slug}`;
    const localizedPath = `/${locale}${path}`;
    categoryData[category.slug] = {
      ...category,
      path,
      localizedPath,
      items: [],
    };
  });

  result.data.items.nodes.forEach(({ fields: { [locale]: item } }) => {
    const path = `${indexPath}/${item.category}/${item.slug}`;
    const localizedPath = `/${locale}${path}`;

    item.path = path;
    item.localizedPath = localizedPath;

    categoryData[item.category].items.push(item);

    if (locale === defaultLocale) {
      actions.createRedirect({
        fromPath: path,
        toPath: localizedPath,
      });
    }

    actions.createPage({
      path: localizedPath,
      component: require.resolve('../../../../../templates/ResourcesChannelDetailsPage.js'),
      context: {
        ...context,
        pageData: item,
      },
    });
  });

  const categories = common.categories.map(slug => categoryData[slug]);

  categories.forEach((category, i) => {  
    if (i === 0) {
      if (locale === defaultLocale) {
        actions.createRedirect({
          fromPath: '/resources',
          toPath: category.localizedPath,
        });
      }
      actions.createRedirect({
        fromPath: `/${locale}/resources`,
        toPath: category.localizedPath,
      });
      actions.createRedirect({
        fromPath: `/${locale}${indexPath}`,
        toPath: category.localizedPath,
      });
    }

    const isChannel = category.slug === 'cantonese-opera-online-course';

    category.items.sort((a, b) => {
      if (isChannel) {
        return a.slug.localeCompare(b.slug);
      }
      return b.date.localeCompare(a.date);
    });

    actions.createPage({
      path: category.localizedPath,
      component: require.resolve('../../../../../templates/ResourcesChannelCategoryPage.js'),
      context: {
        ...context,
        categories,
        pageData: category,
        channel: common,
        isChannel,
      },
    });
  });

  return Promise.resolve({ categories });
}
