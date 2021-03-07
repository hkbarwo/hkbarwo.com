exports.createMemberApplyPage = async ({ actions, graphql, md }, context) => {
  const { locale, defaultLocale, pages: { 'member-apply': pageItem } } = context;

  const result = await graphql(`
    {
      page: yamlMemberApply {
        fields {
          ${locale} {
            title
            description
            image
            registration {
              title
              description
              steps {
                title
                icon
              }
            }
            pdf
          }
        }
      }
    }
  `);
  
  const pageData = result.data.page.fields[locale];
  pageData.registration.description = md.render(pageData.registration.description);

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../../templates/MemberApplyPage.js'),
    context: {
      ...context,
      pageItem,
      pageData: result.data.page.fields[locale],
    },
  });

  if (locale === defaultLocale) {
    actions.createRedirect({
      fromPath: pageItem.url,
      toPath: pageItem.localizedPath,
    });
  }
};
