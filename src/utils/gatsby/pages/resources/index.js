const { createResourcesBookmarksPage } = require("./bookmarks");
const { createResourcesChannelPages } = require("./channel");
const { createResourcesEbooksPage } = require("./ebook");
const { createResourcesPhotoGalleryPage } = require("./photo-gallery");
const { createResourcesPublicationsPage } = require("./publications");

exports.createResourcesPages = async (params, { ...context }) => {
  const parentPage = context.menus.secondary.find(({ slug }) => slug === 'resources');
  context.parentPage = parentPage;
  const [{ categories }] = await Promise.all([
    createResourcesChannelPages(params, context),
    createResourcesPublicationsPage(params, context),
    createResourcesPhotoGalleryPage(params, context),
    createResourcesBookmarksPage(params, context),
    createResourcesEbooksPage(params, context),
  ]);
  return { channelCategories: categories };
}
