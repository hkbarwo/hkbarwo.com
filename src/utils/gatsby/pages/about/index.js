const { createAboutOrganizationPages } = require('./organization');
const { createAboutChroniclePage } = require('./chronicle');
const { createAboutAssociationPages } = require('./associations');
const { createInterviewsPages } = require('./interviews');

const createAboutIndexPage = async (params, context) => {
  const { actions, graphql, md } = params;
  const { locale, defaultLocale, pages: { introduction: pageItem } } = context;

  const aboutPageTemplate = require.resolve('../../../../templates/AboutIndexPage.js');

  const result = await graphql(`
    {
      page: yamlAboutIndex {
        fields {
          ${locale} {
            developmentStrategy
            developmentStrategyImage
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

  pageData.developmentStrategy = md.render(pageData.developmentStrategy);

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });
  }

  actions.createPage({
    path: pageItem.localizedPath,
    component: aboutPageTemplate,
    context: {
      ...context,
      pageItem,
      pageData,
    },
  });
}

exports.createAboutPages = async (params, { ...context }) => {
  let associations;
  let interviewCategories;
  const parentPage = context.menus.secondary.find(({ slug }) => slug === 'about');
  context.parentPage = parentPage;
  await Promise.all([
    createAboutAssociationPages(params, context).then(({ menus }) => {
      associations = menus;
      return createAboutIndexPage(params, { ...context, associations: menus });
    }),
    createInterviewsPages(params, context).then(({ categories }) => {
      interviewCategories = categories;
    }),
    createAboutOrganizationPages(params, context),
    createAboutChroniclePage(params, context),
  ]);
  return { associations, interviewCategories };
}
