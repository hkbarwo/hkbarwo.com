const { createSupportDonationPage } = require("./dondation");
const { createSupportSouvenirsPage } = require("./souvenirs");

exports.createSupportPages = async (params, { ...context }) => {
  const parentPage = context.menus.secondary.find(({ slug }) => slug === 'support');
  context.parentPage = parentPage;
  await Promise.all([
    createSupportDonationPage(params, context),
    createSupportSouvenirsPage(params, context),
  ]);
}
