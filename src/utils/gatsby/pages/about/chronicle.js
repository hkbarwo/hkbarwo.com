exports.createAboutChroniclePage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale } = context;

  const result = await graphql(`
    {
      page: yamlAboutChronicle {
        fields {
          ${locale} {
            excerpt {
              title
              content
            }
            pdf
          }
        }
      }
      categories: allMarkdownRemark(filter: { fileAbsolutePath: {regex: "/data/about/chronicle/categories/" }}) {
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
      items: allMarkdownRemark(
        filter: { fileAbsolutePath: {regex: "/data/about/chronicle/items/" }},
        sort: { fields: fields___${locale}___date, order: DESC }
      ) {
        nodes {
          fields {
            ${locale} {
              title
              slug
              date
              category
              image
            }
          }
        }
      }
    }
  `);

  const categories = {}
  result.data.categories.nodes.forEach(({ fields }) => {
    categories[fields[locale].slug] = fields[locale];
  });

  const chronicle = [];
  let yearGrp = -1;
  result.data.items.nodes.forEach(({ fields }) => {
    const item = fields[locale];
    item.year = new Date(item.date).getFullYear();
    item.category = categories[item.category];
    const year = Math.ceil((item.year + 1) / 10) * 10;
    if (yearGrp !== year) {
      yearGrp = year;
      chronicle.push({
        range: `${year - 10}-${year}`,
        items: [],
      });
    }
    chronicle[chronicle.length - 1].items.push(item);
  })
  

  const pageData = result.data.page.fields[locale];
  
  const path = '/about/chronicle';

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: path,
      toPath: `/${locale}${path}`,
      redirectInBrowser: true,
      isPermanent: true,
      force: true,
    });
  }

  actions.createPage({
    path: `/${locale}${path}`,
    component: require.resolve('../../../../templates/AboutChroniclePage.js'),
    context: {
      ...context,
      pageData,
      chronicle,
    },
  });
}
