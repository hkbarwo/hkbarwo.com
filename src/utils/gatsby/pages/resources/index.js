const { createResourcesBookmarksPage } = require("./bookmarks");
const { createResourcesChannelPages } = require("./channel");

exports.createResourcesPages = async (params, { ...context }) => {
  const parentPage = context.menus.secondary.find(({ slug }) => slug === 'resources');
  context.parentPage = parentPage;
  await Promise.all([
    createResourcesChannelPages(params, context),
    createResourcesBookmarksPage(params, context),
  ]);
}
