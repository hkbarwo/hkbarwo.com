const merge = require('deepmerge');

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
  }
};
