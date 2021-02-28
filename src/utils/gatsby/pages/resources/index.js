const { createResourcesChannelPages } = require("./channel");

exports.createResourcesPages = async (params, context) => {
  await Promise.all([
    createResourcesChannelPages(params, context),
  ]);
}
