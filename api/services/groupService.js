const groupDao = require("../models/groupDao");
const { getUserByPhoneNumber } = require("../models/userDao");
const { validatePhoneNumber } = require("../utils/validate");

const sendInvitation = async (userId, receiverPhoneNumber) => {
  try {
    validatePhoneNumber(receiverPhoneNumber);

    const groupId = await groupDao.getGroupById(userId);
    console.log(groupId)
    if (groupId) {
      const memberCount = await groupDao.getMemberCount(groupId);
      if (memberCount >= 5) {
        const error = new Error("Exceeds maximum member count: 5");
        error.statusCode = 400;
        throw error;
      }
    }

      const receiverData = await getUserByPhoneNumber(receiverPhoneNumber);
      const receiverId = receiverData ? receiverData.id : null;
      console.log(receiverId);

      if (typeof receiverData === "undefined") {
        const error = new Error("Phone number not found");
        error.statusCode = 203;
        throw error;
      }
      const result = await groupDao.sendInvitation(userId, receiverId);
      const group = await groupDao.addMember(userId, receiverId, groupId);

      return { result, group };
    } catch (error) {
      throw error;
    }
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

const getFinanceDetail = async (financeId, yearValue, monthValue) => {
  const filteringQuery = yearValue && monthValue 
    ? ` AND t.created_at LIKE '${yearValue}-${monthValue}%'`
    : '';
  return await groupDao.getFinanceDetail(financeId, filteringQuery);
};

const getGroupMain = async (userId) => {
  const groupId = await groupDao.getGroupById(userId);
  const result = await groupDao.getGroupMain(groupId);
  return {groupId, result};
};

const getFinanceList = async (userId) => {
  return await groupDao.getFinanceList(userId);
};

const changeSharingStatus = async (userId, isAll, financeIds) => {
  if (isAll) return await groupDao.changeSharingStatus(userId, "1");
  if (!financeIds) return await groupDao.changeSharingStatus(userId, "0");
  return await groupDao.changeSharingStatus(
    userId,
    `(id IN (${financeIds}))`,
    financeIds
  );
};

const getSharedFinances = async (
  userId,
  yearValue,
  monthValue,
  memberId,
  type
) => {
  const groupId = await groupDao.getGroupById(userId);
  if (!groupId) {
    const error = new Error("User doesn't have a group");
    error.statusCode = 400;
    throw error;
  }

  const filterByType = " AND p.type = " + type;
  const filterByMember = memberId ? " AND u.id = " + memberId : "";
  const filterByMonth = yearValue
    ? " AND t.created_at LIKE " + '"' + yearValue + "-" + monthValue + '%"'
    : "";
  const membersObj = await groupDao.getMembers(groupId);
  const dataObj = await groupDao.getSharedFinances(
    groupId,
    filterByMonth,
    filterByMember,
    filterByType
  );

  return { data: { ...membersObj, ...dataObj } };
};
const getGroupFinanceManagement = async (
  userId,
  monthValue = "",
  yearValue,
  memberId
) => {
  const groupId = await groupDao.getGroupById(userId);
  if (!groupId || !yearValue) {
    const error = new Error("key error");
    error.statusCode = 400;
    throw error;
  }
  const filterByMember = memberId ? " AND u.id = " + memberId : "";
  const filterByMonth =
    " AND t.created_at LIKE " + '"' + yearValue + "-" + monthValue + '%"';
  const members = await groupDao.getMembers(groupId);
  const incomes = await groupDao.getGroupFinanceManagement(
    groupId,
    " AND amount > 0",
    filterByMember,
    filterByMonth
  );
  const expenses = await groupDao.getGroupFinanceManagement(
    groupId,
    " AND amount < 0",
    filterByMember,
    filterByMonth
  );
  return {
    ...members,
    income: [...incomes],
    expense: [...expenses],
  };
};

const withdrawFromGroup = async (userId) => {
  const groupId = await groupDao.getGroupById(userId);
  if (!groupId) {
    const error = new Error("User doesn't have a group");
    error.statusCode = 400;
    throw error;
  }
  const memberCount = await groupDao.getMemberCount(groupId);
  if (memberCount > 2) {
    return await groupDao.withdrawFromGroup(userId, groupId);
  }
  return await groupDao.withdrawThenRemoveGroup(groupId);
};


const getcardMemberList = async (userId) => {
  const groupId = await groupDao.getGroupById(userId);
  if (!groupId) {
    const error = new Error("User doesn't have a group");
    error.statusCode = 400;
    throw error;
  }
  return await groupDao.getMemberList(groupId);
};

  const getcardFinanceDetail = async (financeId, yearValue, monthValue) => {

  return await groupDao.getCardFinanceDetail(financeId, yearValue, monthValue);
};
module.exports = {
  sendInvitation,
  getMemberList,
  getSharedFinances,
  getGroupMain,
  getSharedFinances,
  getFinanceList,
  changeSharingStatus,
  getGroupFinanceManagement,
  withdrawFromGroup,
  getFinanceDetail,
  getcardMemberList,
  getcardFinanceDetail
};
