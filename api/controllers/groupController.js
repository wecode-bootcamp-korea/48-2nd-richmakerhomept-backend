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
  res.status(200).json({ data: members });
});

module.exports = { addMember, sendInvitation, getMemberList };
