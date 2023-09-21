const express = require('express');

const { transactionDataController } = require('../controllers');
const { loginRequired } = require('../utils/auth');
const router = express.Router();
router.get('', loginRequired, transactionDataController.getFullMainTransaction);
router.get('/transactions/deposits', loginRequired, transactionDataController.getTransactionDataByDeposits);
router.get('/transactions/expenses', loginRequired, transactionDataController.getTransactionDataByExpenses);

module.exports = router;