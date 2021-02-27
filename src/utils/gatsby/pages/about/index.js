const { createAboutOrganizationPages } = require('./organization');
const { createAboutChroniclePage } = require('./chronicle');

const createAboutIndexPage = async (params, context) => {
  const { actions, graphql } = params;
  const { locale, defaultLocale } = context;

  const aboutPageTemplate = require.resolve('../../../../templates/AboutIndexPage.js');

  const result = await graphql(`
    {
      page: yamlAboutIndex {
        fields {
          ${locale} {
            developmentStrategy
            associations {
              buttonTitle
              title
            }
            excerpt {
              content
              title
            }
            excerpt2 {
              content
              title
            }
            introduction {
              content
              image
              title
            }
            sections {
              content
              image
              title
            }
            title
          }
        }
      }
    }
  `);

  const pageData = result.data.page.fields[locale];
  
  const path = '/about';

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
    component: aboutPageTemplate,
    context: {
      ...context,
      pageData,
    },
  });
}

exports.createAboutPages = async (params, context) => {
  await Promise.all([
    createAboutIndexPage(params, context),
    createAboutOrganizationPages(params, context),
    createAboutChroniclePage(params, context),
  ]);
}
