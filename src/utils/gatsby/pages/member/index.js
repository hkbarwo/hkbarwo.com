const { createMemberApplyPage } = require("./apply");
const { createMemberEventsPage } = require("./events");

exports.createMemberPages = async (params, context) => {
  await Promise.all([
    createMemberApplyPage(params, context),
    createMemberEventsPage(params, context),
  ]);
}
