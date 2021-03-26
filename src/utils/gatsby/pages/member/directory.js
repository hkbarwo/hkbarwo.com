exports.createMemberDirectoryPage = async ({ actions, graphql, md }, context) => {
  const { locale, defaultLocale, pages: { 'member-directory': pageItem } } = context;

  const result = await graphql(`
    {
      members: allMarkdownRemark(
        filter: {
          fileAbsolutePath: {regex: "/data/members/items/"}
        },
        sort: { fields: [fields___zh___slug], order: ASC }
      ) {
        nodes {
          fields {
            ${locale} {
              title
              slug
              alias
              gender
              role
              position
              photo
              description
              thoughts
            }
          }
        }
      }
    }
  `);
  
  const directory = {};
  const members = {};
  result.data.members.nodes.forEach(({ fields: { [locale]: member }}) => {
    const directoryIndex = member.slug[0].toUpperCase();
    if (!directory[directoryIndex]) {
      directory[directoryIndex] = [];
    }
    directory[directoryIndex].push(member.slug);
    members[member.slug] = member;
  });

  const pageData = {
    members,
    directory: Object.keys(directory).sort().map(key => ({
      key,
      members: directory[key],
    })),
  };

  actions.createPage({
    path: pageItem.localizedPath,
    component: require.resolve('../../../../templates/MemberDirectoryPage.jsx'),
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
