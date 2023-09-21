const { transactionDataService } = require('../services');
const { catchAsync } = require('../utils/error');

const getTransactionDataByDeposits = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const {monthValue } = req.query;
    const transactionDataByDeposits = await transactionDataService.getTransactionDataByDeposits(userId, monthValue);
    res.status(200).json({ data: transactionDataByDeposits });          
});

const getTransactionDataByExpenses = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const {monthValue} = req.query;
    const transactionDataByExpenses = await transactionDataService.getTransactionDataByExpenses(userId, monthValue);
    res.status(200).json({ data: transactionDataByExpenses });
});

const getFullMainTransaction = catchAsync(async (req, res) => {
    console.log("check1");
    const userId = req.user.id;
    const {monthValue} = req.query;
    console.log("check2");
    const fullMainTransaction = await transactionDataService.getFullMainTransaction(userId, monthValue);
    res.status(200).json({ data: fullMainTransaction });
});

module.exports = {
    getTransactionDataByDeposits,
    getTransactionDataByExpenses,
    getFullMainTransaction,
  };