const { addExpense, getExpense, deleteExpense } = require('../controllers/expense_controller');
const { addIncome, getIncomes, deleteIncome, getCurrIncome, updateIncome } = require('../controllers/income_controller');

const router = require('express').Router();


router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .get('/get-income/:id', getCurrIncome)
    .post('/update-income', updateIncome)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)

module.exports = router