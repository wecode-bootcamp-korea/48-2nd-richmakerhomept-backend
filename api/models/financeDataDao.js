const {AppDataSource} = require('./dataSource');

const getFinanceDataByDeposits= async (userId, yearValue, monthValue) => {
    try {
      const result = await AppDataSource.query( 
        `
      SELECT
        SUM(ABS(t.amount)) AS amountSum
      FROM
        users AS u
        RIGHT JOIN user_finances AS f ON u.id = f.user_id
        RIGHT JOIN transactions AS t ON t.user_finances_id = f.id
        WHERE u.id = ? AND t.amount > 0 AND YEAR(t.created_at) = ? 
          AND MONTH(t.created_at) = ?
        GROUP BY  DATE_FORMAT(t.created_at, '%Y-%m');
          `,
        [userId, yearValue, monthValue]
       );
      if (!result){
        result = "0";
      }
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
      const result = await AppDataSource.query( 
        `
      SELECT
        SUM(ABS(t.amount)) AS amountSum
      FROM
        users AS u
        RIGHT JOIN user_finances AS f ON u.id = f.user_id
        RIGHT JOIN transactions AS t ON t.user_finances_id = f.id
        WHERE u.id = ? AND t.amount < 0 AND YEAR(t.created_at) = ? 
        AND MONTH(t.created_at) = ?
      GROUP BY  DATE_FORMAT(t.created_at, '%Y-%m');
          `,
        [userId, yearValue, monthValue]
       );
       if (!result){
        result = "0";
      }
      return result;
      
    } catch (err) {
      console.log(err)
      const error = new Error('dataSource Error');
      error.statusCode = 400;
      throw error;
    }
  }; 

module.exports = {
  getFinanceDataByDeposits,
  getFinanceDataByExpenses,
};