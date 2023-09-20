const { catchAsync } = require("../utils/error");
const groupService = require("../services/groupService");

const addMember = catchAsync(async (req, res) => {
  const invitationId = req.body.id;
  if (!invitationId) {
    const error = new Error("KEY ERROR");
    error.statusCode = 400;
    throw error;
  }
  await groupService.addMember(invitationId);
  res.status(200).json({ message: "member added" });
});

const sendInvitation = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { receiverPhoneNumber } = req.body;

  if (!userId || !receiverPhoneNumber) {
    const error = new Error("KEY ERROR");
    error.statusCode = 400;
    throw error;
  }
  await groupService.sendInvitation(userId, receiverPhoneNumber);
  res.status(200).json({ message: "invitation sent and added member" });
});

const getMemberList = catchAsync(async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    const error = new Error("KEY ERROR");
    error.statusCode = 400;
    throw error;
  }
  const members = await groupService.getMemberList(userId);
  res.status(200).json(members);
});

const getGroupMain = catchAsync(async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    const error = new Error("KEY ERROR");
    error.statusCode = 400;
    throw error;
  }
  const {groupId, result} = await groupService.getGroupMain(userId);

  res.status(200).json({groupId, result});
});

const getFinanceDetail = catchAsync(async (req, res) => {
  const { financeId, yearValue, monthValue } = req.query;
  if (!financeId) {
    const error = new Error("KEY ERROR");
    error.statusCode = 400;
    throw error;
  }
  const data = await groupService.getFinanceDetail(
    financeId,
    yearValue,
    monthValue
  );
  res.status(200).json({ data: [data] });
});

const getSharedFinances = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { type, yearValue, monthValue, memberId } = req.query;
  if (!userId) {
    const error = new Error("KEY ERROR");
    error.statusCode = 400;
    throw error;
  }
  const finances = await groupService.getSharedFinances(
    userId,
    yearValue,
    monthValue,
    memberId,
    type
  );
  res.status(200).json(finances);
});
const changeSharingStatus = catchAsync(async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    const error = new Error("KEY ERROR");
    error.statusCode = 400;
    throw error;
  }
  const { isAll, financeIds } = req.body;

  const changedRows = await groupService.changeSharingStatus(
    userId,
    isAll,
    financeIds
  );
  res.status(200).json({ message: `${changedRows} finances updated` });
});

const getFinanceList = catchAsync(async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    const error = new Error("KEY ERROR");
    error.statusCode = 400;
    throw error;
  }
  const data = await groupService.getFinanceList(userId);
  res.status(200).json({ data: data });
});

const getGroupFinanceManagement = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { monthValue, yearValue, memberId } = req.query;
  if (!userId) {
    const error = new Error("KEY ERROR");
    error.statusCode = 400;
    throw error;
  }
  const data = await groupService.getGroupFinanceManagement(
    userId,
    monthValue,
    yearValue,
    memberId
  );
  res.status(200).json({ data: data });
});

const withdrawFromGroup = catchAsync(async (req, res) => {
  const userId = req.params.userId

  if (!userId) {
    const error = new Error("KEY ERROR");
    error.statusCode = 400;
    throw error;
  }
  await groupService.withdrawFromGroup(userId);
  res.status(200).json({ message: "successfully withdrew from group" });
});

const getcardFinanceDetail = catchAsync(async (req, res) => {
  const { financeId, yearValue, monthValue} = req.query;
  console.log(req);
  console.log(financeId, yearValue, monthValue)
  if (!yearValue || !monthValue) {
      return res.status(400).json({ message: "Year and month are required." });
  }
      const result = await groupService.getcardFinanceDetail(financeId, yearValue, monthValue);
      return res.status(200).json(result);

});

module.exports = {
  addMember,
  sendInvitation,
  getMemberList,
  getGroupMain,
  getSharedFinances,
  getFinanceList,
  changeSharingStatus,
  getGroupFinanceManagement,
  withdrawFromGroup,
  getFinanceDetail,
  getcardFinanceDetail
};
