exports.createHomePage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale } = context;

  const homePageTemplate = require.resolve('../../../templates/HomePage.js');

  const result = await graphql(`
    {
      swiper: yamlPagesHomeSwiperConfig {
        fields {
          ${locale} {
            slides
          }
        }
      }
      slides: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/pages/home/swiper/slides/"}}) {
        edges {
          node {
            fields {
              ${locale} {
                title
                shortTitle
                subtitle
                description
                buttonTitle
                bgImage
                bgImageFillStyle
                slug
                gradient {
                  color1
                  color2
                }
              }
            }
          }
        }
      }
      news: allMarkdownRemark(filter: {
        fileAbsolutePath: {regex: "/data/news/items/"}},
        sort: {order: DESC, fields: fields___${locale}___date,
      }, limit: 12) {
        nodes {
          fields {
            ${locale} {
              title
              slug
              date
            }
          }
        }
      }
    }
  `);

  const slidesData = {};
  result.data.slides.edges.forEach(({ node: { fields }}) => {
    const slideData = fields[locale];
    slidesData[slideData.slug] = slideData;
  });

  const slides = result.data.swiper.fields[locale].slides.map(slug => slidesData[slug]);

  const news = result.data.news.nodes.map(({ fields }) => fields[locale]);

  const path = '/';

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
    component: homePageTemplate,
    context: {
      ...context,
      slides,
      news,
    },
  }); 
};
