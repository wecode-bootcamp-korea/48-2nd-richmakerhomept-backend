const groupDao = require("../models/groupDao");
const { getUserByphoneNumber } = require("../models/userDao");
const { validatePhoneNumber } = require("../utils/validate");

const sendInvitation = async (userId, receiverPhoneNumber) => {
  validatePhoneNumber(receiverPhoneNumber);

  const groupId = await groupDao.getGroupById(userId);
  if (groupId) {
    const memberCount = await groupDao.getMemberCount(groupId);
    if (memberCount >= 5) {
      const error = new Error("Exceeds maximum member count: 5");
      error.statusCode = 400;
      throw error;
    }
  }
  const receiverId = await getUserByphoneNumber(receiverPhoneNumber)?.id;
  if (!receiverId) {
    const error = new Error("User not signed up");
    error.statusCode = 404;
    throw error;
  }

  const receiverGroupId = await groupDao.getGroupById(receiverId);
  if (receiverGroupId === groupId) {
    const error = new Error("The user is already a member");
    error.statusCode = 400;
    throw error;
  }
  if (receiverGroupId) {
    const error = new Error("The user is in other groups");
    error.statusCode = 400;
    throw error;
  }

  await groupDao.sendInvitation(userId, receiverId);
  await groupDao.addMember(userId, receiverId, groupId);
};

const getMemberList = async (userId) => {
  const groupId = await groupDao.getGroupById(userId);
  if (!groupId) {
    const error = new Error("User doesn't have a group");
    error.statusCode = 400;
    throw error;
  }
  return await groupDao.getMemberList(groupId);
};
module.exports = { sendInvitation, getMemberList };
