const { 取笔顺 } = require('chinese-character-strokes');

function getStrokeCount(char) {
  return (取笔顺(char) || '').length
}

function compareMember(m1, m2) {
  const length = Math.max(m1.strokeCounts.length, m2.strokeCounts.length);
  for (let i = 0; i < length; i++) {
    const s1 = m1.strokeCounts[i];
    const s2 = m2.strokeCounts[i];
    if (!s1) {
      return -1;
    }
    if (!s2) {
      return 1;
    }
    if (s1 !== s2) {
      return Number(s1) - Number(s2);
    }
    const localeCompare = m1.title[i].localeCompare(m2.title[i], 'zh-Hant');
    if (localeCompare !== 0) {
      return localeCompare;
    }
  }
  return 0;
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
      data.strokeCounts = [...member.title].map(t => getStrokeCount(t)).filter(c => c > 0);
    }
    return data;
  });
  if (locale === 'zh') {
    memberList.sort((m1, m2) => compareMember(m1, m2));
  }
  memberList.forEach((member) => {
    let directoryIndex;
    if (member.strokeCounts && member.strokeCounts.length) {
      if (currentStroke - 1 + 5 < member.strokeCounts[0]) {
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
