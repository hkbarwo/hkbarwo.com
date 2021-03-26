const { createMemberApplyPage } = require("./apply");
const { createMemberDirectoryPage } = require("./directory");
const { createMemberEventsPage } = require("./events");
const { createMemberMemorialPage } = require("./memorial");

exports.createMemberPages = async (params, { ...context }) => {
  const parentPage = context.menus.secondary.find(({ slug }) => slug === 'member');
  context.parentPage = parentPage;
  await Promise.all([
    createMemberApplyPage(params, context),
    createMemberDirectoryPage(params, context),
    createMemberMemorialPage(params, context),
    createMemberEventsPage(params, context),
  ]);
}
