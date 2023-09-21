const transactionDataDao = require('../models/transactionDataDao');
const financialFunction = require('../utils/financialFunction');

const getTransactionDataByDeposits= async (userId, monthValue) => {
    return await transactionDataDao.getTransactionDataByDeposits(userId, monthValue);
  };

const expensesByMonth = (sortBy) => {
    switch (sortBy) {
      case 'monthly':
        return ` AND t.amount < 0 AND t.is_monthly = 1`;
      default:
        return ` AND t.amount < 0`;
    }
  };

const getTransactionDataByExpenses= async (userId, monthValue) => {
    const monthlyQuery = expensesByMonth();
    console.log("user  " + userId);
    console.log("monthvalue  " + monthValue);

    return await transactionDataDao.getTransactionDataByExpenses(userId, monthValue, monthlyQuery);
};


const getTransactionDataByMonthlyExpenses= async (userId, monthValue) => {  
  const sortBy = 'monthly'
  const monthlyQuery = expensesByMonth(sortBy);
  return await transactionDataDao.getTransactionDataByExpenses(userId, monthValue, monthlyQuery);
};

const getFinanceDataByExpensesandCategory = async (userId, yearValue, monthValue) => {
  
  const categories = [1,2,3,4,5,6,7,8,9,10]
  const monthResult = []; 
  
  for (let c = 1; c < categories.length; c++) {
    let categoryInfo = {};
    let categoryId = 0;
    let categoryName;
    let amountsBycategories = 0
    categoryId = c ;
    const transactionData = await transactionDataDao.getFinanceDataByExpensesandCategory(userId, categoryId, yearValue, monthValue);
    if(transactionData)
    {
      categoryName = transactionData.categoryName;
      amountsBycategories = transactionData.amountSum;
      categoryInfo = {
        "id": categoryName,
        "label": categoryName,
        "value": amountsBycategories,
        "color": `hsl(${Math.random() * 360}, 70%, 50%)`
      };
      monthResult.push(categoryInfo);
    }
      
  }
  monthResult.sort((a, b) => b.value - a.value);
  return monthResult;
};

const getFullMainTransaction = async (userId, monthValue) => {
  const expensesData = await getTransactionDataByExpenses(userId, monthValue);
  console.log("rslt DataByExpenses ");
  console.log(expensesData);
  const monthlyExpensesData = await getTransactionDataByMonthlyExpenses(userId, monthValue);
  console.log("rslt monthlyExpensesData ");
  console.log(monthlyExpensesData);
  const depositsData = await getTransactionDataByDeposits(userId, monthValue);
  console.log("rslt depositsData ");
  console.log(depositsData);

  const yearValue = 2023;
  const expensesAmountByCategory = await getFinanceDataByExpensesandCategory(userId, yearValue, monthValue);
  const results =[];
  console.log("expensesAmountByCategory " + expensesAmountByCategory);

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
    depositAmountsArray.push(depositsData[j].amount);
  }
  
  for (let k = 0; k < monthlyExpensesData.length; k++) {
    monthlyExpenseAmountsArray.push(monthlyExpensesData[k].amount);
  }
  
  for (let l = 0; l < 3; l++) {
    if(expensesAmountByThreeCategories)
    {
      expensesAmountByThreeCategories.push(expensesAmountByCategory[l].amount);
    }
    
  }
  if(expensesAmountByThreeCategories)
    {
      expensesAmountByThreeCategories.sort((a, b) => a.amount - b.amount);
    }
  const floatExpenseAmountsArray = expenseAmountsArray.map((str) => parseFloat(str));
  const floatdepositAmountsArray = depositAmountsArray.map((str) => parseFloat(str));
  const floatmonthlyExpenseAmountsArray = monthlyExpenseAmountsArray.map((str) => parseFloat(str));

  sumExpensesAmount = financialFunction.sum(floatExpenseAmountsArray);
  sumDepositsAmount = financialFunction.sum(floatdepositAmountsArray);
  sumMonthlyExpensesAmount = financialFunction.sum(floatmonthlyExpenseAmountsArray);
  variableExpensesAmount = sumExpensesAmount-sumMonthlyExpensesAmount;
  const sumMonthlyExpensesAmountString = "" + sumMonthlyExpensesAmount; //문자열로 배출
  const sumDepositsAmountAmountString = "" + sumDepositsAmount;  //문자열로 배출

  const dataInfo = {
    "depositsAmount": sumDepositsAmountAmountString,
    "expensesAmount": sumExpensesAmount,
    "monthlyExpenseAmounts": sumMonthlyExpensesAmountString,
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