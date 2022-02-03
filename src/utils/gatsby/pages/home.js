exports.createHomePage = async ({ actions, graphql }, context) => {
  const { locale, defaultLocale, pages: { index: pageItem } } = context;

  const homePageTemplate = require.resolve('../../../templates/HomePage.js');

  const result = await graphql(`
    {
      swiper: yamlPagesHomeSwiperConfig {
        slides
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
                buttonLink {
                  page
                  url
                }
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
      souvenir: yamlSupportSouvenirs {
        fields {
          ${locale} {
            title
            content
            items {
              code
              image
              title
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

  const slides = result.data.swiper.slides.map(slug => slidesData[slug]);

  const news = result.data.news.nodes.map(({ fields }) => fields[locale]);

  actions.createPage({
    path: pageItem.localizedPath,
    component: homePageTemplate,
    context: {
      ...context,
      pageItem,
      slides,
      news,
      souvenir: result.data.souvenir.fields[locale].items,
    },
  });

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });
  }
};
