const financeDataDao = require('../models/financeDataDao');

const getFinanceDataByDeposits= async (userId, yearValue, monthValue) => {
  return await financeDataDao.getFinanceDataByDeposits(userId, yearValue, monthValue);
}

const getFinanceDataByExpenses= async (userId, yearValue, monthValue) => {
  return await financeDataDao.getFinanceDataByExpenses(userId, yearValue, monthValue);
};

const getDepositsExpenses= async (userId, yearValue, monthValue) => {
  let incomeValue = 0;
  let expenseValue = 0; 
  const monthResult = []; 
  for (var i = 0; i < 4; i++) {

    
    incomeSum = await getFinanceDataByDeposits(userId, yearValue, monthValue);
    expenseSum = await getFinanceDataByExpenses(userId, yearValue, monthValue);
    incomeValue = incomeSum.map(item => item.amountSum || "0.00");
    expenseValue = expenseSum.map(item => item.amountSum|| "0.00");

    console.log(incomeValue);
    if (!incomeValue[0])
    {
      incomeValue[0] = "0.00"
    }
    if (!incomeValue[0])
    {
      expenseValue[0] = "0.00"
    }

    const finanaceInfo = {
      "month": monthValue,
      "income": incomeValue[0],
      "expense": expenseValue[0],
    };
    monthResult.push(finanaceInfo)

    if (monthValue == 1) {
      yearValue = yearValue-1;
      monthValue = 12;
    } else {
      monthValue--;
    }
  }
  return monthResult;
};

module.exports = {
  getFinanceDataByDeposits,
  getFinanceDataByExpenses,
  getDepositsExpenses,
};