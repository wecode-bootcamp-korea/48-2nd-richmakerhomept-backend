const { financeDataService } = require('../services');
const { catchAsync } = require('../utils/error');

const getDepositsExpenses = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { yearValue, monthValue } = req.query;
    const dataDepositsExpenses = await financeDataService.getDepositsExpenses(userId, yearValue, monthValue);
    res.status(200).json({ data: dataDepositsExpenses });
});

module.exports = {
    getDepositsExpenses,
};