const algoliasearch = require('algoliasearch');

exports.createAlgoliaSearchAdminClient = async function () {
  const appID = process.env.ALGOLIA_APP_ID;
  const adminAPIKey = process.env.ALGOLIA_ADMIN_API_KEY;
  const searchOnlyAPIKey = process.env.ALGOLIA_SEARCH_ONLY_API_KEY;
  const searchIndex = process.env.ALGOLIA_SEARCH_INDEX;
  const algolia = {
    appID,
    searchOnlyAPIKey,
    searchIndex,
  };

  const objectsToBeSaved = []

  if (appID && adminAPIKey) {
    algolia.client = algoliasearch(appID, adminAPIKey);
    algolia.index = algolia.client.initIndex(searchIndex);
    await algolia.index.clearObjects();
    await algolia.index.setSettings({
      attributeForDistinct: 'name',
      distinct: true,
    });
    algolia.saveObjects = (objs) => {
      objectsToBeSaved.push(objs)
    };
    algolia.saveAllObjects = async () => {
      return algolia.index.saveObjects(objectsToBeSaved)
    }
  } else {
    algolia.saveObjects = () => {};
    algolia.saveAllObjects = () => {};
  }

  return algolia;
}
