const express = require('express');

const { financeDataController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

const router = express.Router();
router.get('/reports', loginRequired, financeDataController.getDepositsExpenses);
//router.get('/sum', loginRequired, financeDataController.getAllFinanceDataByUserID);
//router.get('/sumdeposits', loginRequired, financeDataController.getFinanceDataByDeposits);
//router.get('/sumexpenses', loginRequired, financeDataController.getFinanceDataByExpenses);

//router.get('/expensescategory', loginRequired, financeDataController.getFinanceDataByExpensesandCategory);

module.exports = router;