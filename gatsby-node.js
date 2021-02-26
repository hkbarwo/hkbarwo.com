const merge = require('deepmerge');

const { fetchSiteData } = require('./src/utils/gatsby/general');
const { fetchMenus } = require('./src/utils/gatsby/menus');
const { createHomePage } = require('./src/utils/gatsby/pages/home');

const defaultLocale = 'zh';
const locales = ['zh', 'en'];

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const { frontmatter } = node;
    if (frontmatter[defaultLocale]) {
      actions.createNodeField({
        name: 'slug',
        value: frontmatter[defaultLocale].slug,
        node,
      });
      locales.forEach((locale) => {
        actions.createNodeField({
          name: locale,
          value: locale === defaultLocale
            ? frontmatter[defaultLocale]
            : merge(frontmatter[defaultLocale], frontmatter[locale]),
          node,
        });
      });
    }
  } else if (/^yaml/.test(node.internal.type)) {
    if (node[defaultLocale]) {
      locales.forEach((locale) => {
        actions.createNodeField({
          name: locale,
          value: locale === defaultLocale
            ? node[defaultLocale]
            : merge(node[defaultLocale], node[locale]),
          node,
        });
      });
    }
  }
};

exports.createPages = async (params) => {
  for (let i = 0; i < locales.length; i++) {
    const locale = locales[i];
    const siteData = await fetchSiteData(params, { locale });
    const menus = await fetchMenus(params, { locale });
    const context = { locale, defaultLocale, menus, ...siteData };
    await createHomePage(params, context);
  }
};
