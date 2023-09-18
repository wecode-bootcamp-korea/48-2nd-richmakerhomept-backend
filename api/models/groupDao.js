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

const getMemberList = async (groupId) => {
  try {
    return await AppDataSource.query(
      `select u.id as userId, u.user_name as userName, u.profile_image as profileImage, SUM(case when uf.is_shared then 1 else 0 end) as sharedFinanceCount
        from users u
        LEFT join user_finances uf ON u.id = uf.user_id
        where u.grouping_id = ?
        GROUP BY u.id`,
      [groupId]
    );
  } catch {
    const error = new Error("dataSource Error");
    error.statusCode = 400;
    throw error;
  }
};

const getGroupMain = async (groupId) => {
  try {
    const [data] = await AppDataSource.query(
      `WITH Finances AS (
        SELECT
            p.type AS t,
            JSON_OBJECT(
              'financeId',uf.id,
                'userId', u.id,
                'userImage', u.profile_image,
                'providerImage', p.image_url,
                'providerName', p.provider_name,
                'financeNumber', uf.finance_number,
                'amount', COALESCE(SUM(t.amount), 0)
            ) AS finances
        FROM user_finances uf
        LEFT JOIN transactions t ON uf.id = t.user_finances_id
        JOIN providers p ON uf.provider_id = p.id
        JOIN users u ON u.id = uf.user_id
        WHERE u.grouping_id = ? AND uf.is_shared = 1
        GROUP BY uf.id, p.type
    ),
    UserNames AS (
        SELECT JSON_OBJECT(
            'userId', u.id,
            'userImage', u.profile_image
        ) AS user_names
        FROM users u
        WHERE u.grouping_id = ?
    ),
    DayCounts as(select DATEDIFF(CURRENT_TIMESTAMP,g.created_at) as dayCounts from groupings g where id = 1
    ),
    Expenses as(
      select json_object("totalAmounts",coalesce(sum(t.amount),0), "totalCounts",count(t.id)) as totals
      from transactions t
      join user_finances uf on uf.id = t.user_finances_id
      join users u on u.id = uf.user_id
      where u.grouping_id = ? and uf.is_shared = 1 and amount < 0
    ),
    Incomes as(
      select json_object("totalAmounts",coalesce(sum(t.amount),0), "totalCounts",count(t.id)) as totals
      from transactions t
      join user_finances uf on uf.id = t.user_finances_id
      join users u on u.id = uf.user_id
      where u.grouping_id = ? and uf.is_shared = 1 and amount > 0
    )
    SELECT
      (select JSON_ARRAYAGG(user_names) FROM UserNames) AS members,
      (select dayCounts from DayCounts) as dayCount,
      (select totals from Incomes) as totalIncomes,
      (select totals from Expenses) as totalExpenses,
      (SELECT JSON_ARRAYAGG(finances) FROM Finances WHERE t = "b") AS banks,
      (SELECT JSON_ARRAYAGG(finances) FROM Finances WHERE t = "c") AS cards;`,
      [groupId, groupId, groupId, groupId]
    );
    return data;
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
  getMemberList,
  getGroupMain,
};
