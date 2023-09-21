const financeDataDao = require('../models/financeDataDao');

const getFinanceDataByDeposits= async (user, yearValue, monthValue) => {
  return await financeDataDao.getFinanceDataByDeposits(user.id, yearValue, monthValue);
}

const getFinanceDataByExpenses= async (user, yearValue, monthValue) => {
  return await financeDataDao.getFinanceDataByExpenses(user.id, yearValue, monthValue);
};

const getDepositsExpenses= async (user, yearValue, monthValue) => {
  let incomeValue = 0;
  let expenseValue = 0; 
  const monthResult = []; 
  for (var i = 0; i < 4; i++) {

    monthValue = monthValue - i;
    if (monthValue == 1) {
      yearValue = yearValue-1;
      monthValue = 12;
    } else {
      monthValue--;
    }
    
    incomeValue = getFinanceDataByDeposits(user.id, yearValue, monthValue);
    expenseValue = getFinanceDataByExpenses(user.id, yearValue, monthValue);
    
    const finanaceInfo = {
      "month": monthValue,
      "income": incomeValue,
      "expense": expenseValue,
    };
    
    monthResult.push(finanaceInfo)
  }
  return monthResult;
};

module.exports = {
  getFinanceDataByDeposits,
  getFinanceDataByExpenses,
  getDepositsExpenses,
};