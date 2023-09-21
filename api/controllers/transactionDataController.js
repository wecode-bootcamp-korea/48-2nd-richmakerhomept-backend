const { transactionDataService } = require('../services');
const { catchAsync } = require('../utils/error');

const getTransactionDataByDeposits = catchAsync(async (req, res) => {
    const user = req.user;
    const {monthValue } = req.query;
    const transactionDataByDeposits = await transactionDataService.getTransactionDataByDeposits(user, monthValue);
    res.status(200).json({ data: transactionDataByDeposits });          
});

const getTransactionDataByExpenses = catchAsync(async (req, res) => {
    const user = req.user;
    const {monthValue} = req.query;
    const transactionDataByExpenses = await transactionDataService.getTransactionDataByExpenses(user, monthValue);
    res.status(200).json({ data: transactionDataByExpenses });
});

const getFullMainTransaction = catchAsync(async (req, res) => {
    const user = req.user;
    const {monthValue} = req.query;
    const fullMainTransaction = await transactionDataService.getFullMainTransaction(user, monthValue);
    res.status(200).json({ data: fullMainTransaction });
});

module.exports = {
    getTransactionDataByDeposits,
    getTransactionDataByExpenses,
    getFullMainTransaction,
  };