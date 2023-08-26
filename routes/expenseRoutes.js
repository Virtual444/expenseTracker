const express = require('express');
const router = express.Router();
const expenseControllers = require('../controllers/expenseControllers');

//const Expense = require('../models/expenses');

router.get('/all-expenses', expenseControllers.allExpenses );
router.post('/add-expense', expenseControllers.addExpense);
router.put('/edit-Expense/:id', expenseControllers.updateExpense);
router.get('/edit-Expense/:id', expenseControllers.editExpense);
router.delete('/delete-expense/:id', expenseControllers.deleteExpense);

module.exports = router;
