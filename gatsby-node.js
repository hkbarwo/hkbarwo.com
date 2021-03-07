const merge = require('deepmerge');
const { Remarkable } = require('remarkable');

const { fetchSiteData } = require('./src/utils/gatsby/general');
const { fetchMenus } = require('./src/utils/gatsby/menus');
const { fetchPageItems } = require('./src/utils/gatsby/pages');
const { fetchNewsCategories } = require('./src/utils/gatsby/news');
const { createAboutPages } = require('./src/utils/gatsby/pages/about');
const { createHomePage } = require('./src/utils/gatsby/pages/home');
const { createNewsPages } = require('./src/utils/gatsby/pages/news');
const { createResourcesPages } = require('./src/utils/gatsby/pages/resources');
const { createContactPage } = require('./src/utils/gatsby/pages/contact');
const { createSupportPage } = require('./src/utils/gatsby/pages/support');
const { createMemberPages } = require('./src/utils/gatsby/pages/member');

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
            : merge(frontmatter[defaultLocale], frontmatter[locale], {
              arrayMerge: (_, source) => source,
            }),
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
            : merge(node[defaultLocale], node[locale], {
              arrayMerge: (_, source) => source,
            }),
          node,
        });
      });
    }
  }
};

exports.createPages = async (params) => {
  const { actions } = params;
  params.md = new Remarkable();

  for (let i = 0; i < locales.length; i++) {
    const locale = locales[i];
    const [
      siteData,
      pages,
    ] = await Promise.all([
      fetchSiteData(params, { locale }),
      fetchPageItems(params, { locale }),
    ]);
    const [
      menus,
      newsCategories,
    ] = await Promise.all([
      fetchMenus(params, { locale, pages }),
      fetchNewsCategories(params, { locale }),
    ]);
    const context = {
      locale,
      pages,
      defaultLocale,
      menus,
      newsCategories,
      ...siteData,
    };
    await Promise.all([
      createHomePage(params, context),
      createNewsPages(params, context),
      createAboutPages(params, context),
      createResourcesPages(params, context),
      createContactPage(params, context),
      createSupportPage(params, context),
      createMemberPages(params, context),
    ]);

    Object.keys(pages).forEach(slug => {
      const page = pages[slug];
      if (page && page.wip) {
        actions.createPage({
          path: page.localizedPath,
          component: require.resolve('./src/templates/WipPage.js'),
          context: {
            ...context,
            pageData: page,
          },
        })
      }
    });
  }
};
