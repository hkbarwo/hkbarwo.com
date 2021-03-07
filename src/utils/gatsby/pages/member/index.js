const { createMemberApplyPage } = require("./apply");

exports.createMemberPages = async (params, context) => {
  await Promise.all([
    createMemberApplyPage(params, context),
  ]);
}
