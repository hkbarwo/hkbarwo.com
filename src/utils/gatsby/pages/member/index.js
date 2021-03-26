const { createMemberApplyPage } = require("./apply");
const { createMemberDirectoryPage } = require("./directory");
const { createMemberEventsPage } = require("./events");

exports.createMemberPages = async (params, context) => {
  await Promise.all([
    createMemberApplyPage(params, context),
    createMemberDirectoryPage(params, context),
    createMemberEventsPage(params, context),
  ]);
}
