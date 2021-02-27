const { createAboutOrganizationAdvisorsPage } = require('./advisors');
const { createAboutOrganizationCommitteePage } = require('./committee');
const { createAboutOrganizationPresidentsPage } = require('./presidents');

exports.createAboutOrganizationPages = async (params, context) => {
  await Promise.all([
    createAboutOrganizationCommitteePage(params, context),
    createAboutOrganizationPresidentsPage(params, context),
    createAboutOrganizationAdvisorsPage(params, context),
  ]);
}
