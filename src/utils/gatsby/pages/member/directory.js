const { 取笔顺 } = require('chinese-character-strokes');

function getStrokeCount(char) {
  return (取笔顺(char) || '').length
}

exports.createMemberDirectoryPage = async ({ actions, graphql }, context) => {
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
  let currentStroke = 1;
  const memberList = result.data.members.nodes.map(({ fields: { [locale]: member }}) => {
    const data = { ...member };
    if (locale === 'zh' && member.title) {
      data.stroke = getStrokeCount(member.title[0]);
    }
    if (data.stroke) {
    }
    return data;
  });
  if (locale === 'zh') {
    memberList.sort((m1, m2) => m1.title.localeCompare(m2.title, "zh-Hant"));
  }
  memberList.forEach((member) => {
    let directoryIndex;
    if (member.stroke) {
      if (currentStroke - 1 + 5 < member.stroke) {
        currentStroke += 5;
      }

      directoryIndex = currentStroke;
    } else {
      directoryIndex = member.slug[0].toUpperCase();
    }

    if (!directory[directoryIndex]) {
      directory[directoryIndex] = [];
    }

    directory[directoryIndex].push(member.slug);
    members[member.slug] = member;
  });

  const pageData = {
    members,
    directory: Object.keys(directory).sort((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return Number(a) - Number(b);
      }
      if (typeof a === 'number') {
        return -1;
      }
      if (typeof b === 'number') {
        return 1;
      }
      return a - b;
    }).map(key => ({
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
