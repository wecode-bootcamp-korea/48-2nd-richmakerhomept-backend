const transactionDataDao = require('../models/transactionDataDao');
const financialFunction = require('../utils/financialFunction');

const getTransactionDataByDeposits= async (user, monthValue) => {
    return await transactionDataDao.getTransactionDataByDeposits(user.id, monthValue);
  };

const expensesByMonth = (sortBy) => {
    switch (sortBy) {
      case 'monthly':
        return ` AND t.amount < 0 AND t.is_monthly = 1`;
      default:
        return ` AND t.amount < 0`;
    }
  };

const getTransactionDataByExpenses= async (user, monthValue) => {
    const monthlyQuery = expensesByMonth();
    return await transactionDataDao.getTransactionDataByExpenses(user.id, monthValue, monthlyQuery);
};


const getTransactionDataByMonthlyExpenses= async (user, monthValue) => {  
  const sortBy = 'monthly'
  const monthlyQuery = expensesByMonth(sortBy);
  return await transactionDataDao.getTransactionDataByExpenses(user.id, monthValue, monthlyQuery);
};

const getFinanceDataByExpensesandCategory = async (user, yearValue, monthValue) => {
  const categories = Object.values(categoryIdStatus); // 모든 카테고리의 값을 배열로 가져옴
  const monthResult = []; // 각 루프에서의 결과를 저장할 배열
    
  for (const categoryId of categories) {           
    const transactionData = await transactionDataDao.getFinanceDataByExpensesandCategory(user.id, categoryId, yearValue, monthValue);

    const categoryInfo = {
      "id": Object.keys(categoryIdStatus).find(key => categoryIdStatus[key] === categoryId),
      "label": Object.keys(categoryIdStatus).find(key => categoryIdStatus[key] === categoryId),
      "value": transactionData,
      "color": `hsl(${Math.random() * 360}, 70%, 50%)`
    };
      monthResult.push(categoryInfo);
  }
  monthResult.sort((a, b) => b.value - a.value);
  return monthResult;
};

const getFullMainTransaction = async (user, monthValue) => {
  const expensesData = getTransactionDataByExpenses(user.id, monthValue);
  const monthlyExpensesData = getTransactionDataByMonthlyExpenses(user.id, monthValue);
  const depositsData = getTransactionDataByDeposits(user.id, monthValue);
  //const currentDate = new Date();  currentDate.getFullYear();
  const yearValue = 2023;
  const expensesAmountByCategory = getFinanceDataByExpensesandCategory(user.id, yearValue, monthValue);
  const results =[];

  let sumExpensesAmount = 0;
  let sumDepositsAmount = 0;
  let sumMonthlyExpensesAmount = 0;
  let variableExpensesAmount =0;

  const expenseAmountsArray = [];
  const depositAmountsArray = [];
  const monthlyExpenseAmountsArray = [];
  const expensesAmountByThreeCategories = [];

  for (let i = 0; i < expensesData.length; i++) {
    expenseAmountsArray.push(expensesData[i].amount);
  }

  for (let j = 0; j < depositsData.length; j++) {
    depositAmountsArray.push(depositsData[i].amount);
  }
  
  for (let k = 0; k < monthlyExpensesData.length; k++) {
    monthlyExpenseAmountsArray.push(monthlyExpensesData[i].amount);
  }
  
  for (let l = 0; l < 3; l++) {
    expensesAmountByThreeCategories.push(expensesAmountByCategory[i].amount);
  }

  sumExpensesAmount = financialFunction.sum(expenseAmountsArray);
  sumDepositsAmount = financialFunction.sum(depositAmountsArray);
  sumMonthlyExpensesAmount = financialFunction.sum(monthlyExpenseAmountsArray);
  variableExpensesAmount = sumExpensesAmount-sumMonthlyExpensesAmount;

  const dataInfo = {
    "depositsAmount": sumDepositsAmount,
    "expensesAmount": sumExpensesAmount,
    "monthlyExpenseAmounts": sumMonthlyExpensesAmount,
    "variableExpenseAmounts": variableExpensesAmount,
    "amountsBycategories" : expensesAmountByCategory,
    "expensesAmountByThreeCategories" : expensesAmountByThreeCategories
  };
  results.push(dataInfo);

  return results;
};

module.exports = {
    getTransactionDataByDeposits,
    getTransactionDataByExpenses,
    getTransactionDataByMonthlyExpenses,
    getFinanceDataByExpensesandCategory,
    getFullMainTransaction, 
  };