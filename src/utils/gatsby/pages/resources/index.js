const { createResourcesBookmarksPage } = require("./bookmarks");
const { createResourcesChannelPages } = require("./channel");
const { createResourcesPublicationsPage } = require("./publications");

exports.createResourcesPages = async (params, { ...context }) => {
  const parentPage = context.menus.secondary.find(({ slug }) => slug === 'resources');
  context.parentPage = parentPage;
  await Promise.all([
    createResourcesChannelPages(params, context),
    createResourcesPublicationsPage(params, context),
    createResourcesBookmarksPage(params, context),
  ]);
}
