const { AppDataSource } = require("./dataSource");

const getMemberCount = async (groupId) => {
  try {
    const [{ memberCount }] = await AppDataSource.query(
      `select member_count as memberCount
            from groupings
            where id = ?`,
      [groupId]
    );
    return memberCount;
  } catch {
    const err = new Error("datasource error");
    err.statusCode = 400;
    throw err;
  }
};

const sendInvitation = async (userId, receiverId, status = 1) => {
  try {
    const { insertId } = await AppDataSource.query(
      `insert into invitations(inviter_id, receiver_id, status) values(?,?,?);`,
      [userId, receiverId, status]
    );
    return insertId;
  } catch {
    const err = new Error("datasource error");
    err.statusCode = 400;
    throw err;
  }
};

const getGroupById = async (userId) => {
  try {
    const [{ groupId }] = await AppDataSource.query(
      `select grouping_id as groupId
        from users
        where id = ?`,
      [userId]
    );
    return groupId;
  } catch {
    const err = new Error("datasource error");
    err.statusCode = 400;
    throw err;
  }
};

const addMember = async (userId, receiverId, groupId) => {
  try {
    if (groupId) {
      await AppDataSource.query(
        `update users
            set grouping_id = ?
            where id=?`,
        [groupId, receiverId]
      );
      await AppDataSource.query(
        `update groupings
            set member_count = member_count + 1
            where id = ?`,
        [groupId, receiverId, groupId]
      );
    } else {
      const { insertId } = await AppDataSource.query(
        `insert into groupings (member_count) value (2)`
      );
      await AppDataSource.query(
        `update users
            set grouping_id = ?
            where id=? or id = ?`,
        [insertId, userId, receiverId]
      );
    }
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;
    throw error;
  }
};
module.exports = {
  sendInvitation,
  addMember,
  getGroupById,
  getMemberCount,
};
