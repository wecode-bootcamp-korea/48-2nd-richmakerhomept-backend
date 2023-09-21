const dataSource = require('./dataSource');

const getAllFinanceDataByUserID = async (userId) => {
  try {
    const [result] = await dataSource.query( 
      `
      SELECT
        u.id,
        u.user_name
        SUM(ABS(t.amount))
      FROM
        users AS u
        LEFT JOIN  user_finaces AS f ON u.id = f.user_id
        LEFT JOIN  transactions AS t ON t.user_finances_id = f.id
      WHERE u.id = ? 
        AND YEAR(t.created_at) = ? AND MONTH(t.created_at) = ?
      GROUP BY u.id
      ORDER BY t.created_at DESC;
        `,
      [userId]
     );
    return result;

  } catch (err) {
    console.log(err)
    const error = new Error('dataSource Error');
    error.statusCode = 400;
    throw error;
  }
};

const getFinanceDataByDeposits= async (userId, yearValue, monthValue) => {
    try {
      const [result] = await dataSource.query( 
        `
      SELECT
        SUM(ABS(t.amount)) AS amountSum
      FROM
        users AS u
        LEFT JOIN user_finaces AS f ON u.id = f.user_id
        LEFT JOIN transactions AS t ON t.user_finances_id = f.id
      WHERE u.id = ? AND t.amount > 0
        AND YEAR(t.created_at) = ? AND MONTH(t.created_at) = ?
      GROUP BY u.id
      ORDER BY t.created_at DESC;
          `,
        [userId, yearValue, monthValue]
       );
      return result;
      
    } catch (err) {
      console.log(err)
      const error = new Error('dataSource Error');
      error.statusCode = 400;
      throw error;
    }
  };

  const getFinanceDataByExpenses= async (userId, yearValue, monthValue) => {
    try {
      const [result] = await dataSource.query( 
        `
      SELECT
        SUM(ABS(t.amount)) AS amountSum
      FROM
        users AS u
        LEFT JOIN user_finaces AS f ON u.id = f.user_id
        LEFT JOIN transactions AS t ON t.user_finances_id = f.id
      WHERE u.id = ? AND t.amount < 0
        AND YEAR(t.created_at) = ? AND MONTH(t.created_at) = ?
      GROUP BY u.id
      ORDER BY t.created_at DESC;
          `,
        [userId, yearValue, monthValue]
       );
      return result;
      
    } catch (err) {
      console.log(err)
      const error = new Error('dataSource Error');
      error.statusCode = 400;
      throw error;
    }
  }; 

module.exports = {
  getAllFinanceDataByUserID,
  getFinanceDataByDeposits,
  getFinanceDataByExpenses,
};