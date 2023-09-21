const { financeDataService } = require('../services');
const { catchAsync } = require('../utils/error');

const getDepositsExpenses = catchAsync(async (req, res) => {
    const user = req.user;
    const { yearValue, monthValue } = req.query;
    const dataDepositsExpenses = await financeDataService.getDepositsExpenses(user, yearValue, monthValue);
    res.status(200).json({ data: dataDepositsExpenses });
});

module.exports = {
    getDepositsExpenses,
};