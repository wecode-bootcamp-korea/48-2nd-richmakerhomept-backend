const { financeDataService } = require('../services');
const { catchAsync } = require('../utils/error');

/** 
const getAllFinanceDataByUserID = catchAsync(async (req, res) => {
    const user = req.user;
    const edits = await financeDataService.getAllFinanceDataByUserID(user);
    res.status(200).json({ data: edits });          
});
*/

const getDepositsExpenses = catchAsync(async (req, res) => {
    const user = req.user;
    const { yearValue, monthValue } = req.query;
    const dataDepositsExpenses = await financeDataService.getDepositsExpenses(user, yearValue, monthValue);
    res.status(200).json({ data: dataDepositsExpenses });
});

/**
const getFinanceDataByExpensesandCategory= catchAsync(async (req, res) => {
    const user = req.user;
    const { yearValue, monthValue } = req.body;
    const DataByExpensesandCategory = await financeDataService.getFinanceDataByExpensesandCategory(user, yearValue, monthValue);
    res.status(200).json({ data: DataByExpensesandCategory });
});
**/

module.exports = {
    getDepositsExpenses,
};