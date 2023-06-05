const { addExpense, getExpense, deleteExpense } = require('../controllers/expense_controller');
const { addIncome, getIncomes, deleteIncome, getCurrIncome } = require('../controllers/income_controller');

const router = require('express').Router();


router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .get('/get-income/:id', getCurrIncome)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)

module.exports = router