const Expense =  require('../models/expenses');

exports.allExpenses = async (req, res, next) => {
  
    try {
        const expenses = await Expense.findAll();
        console.log(expenses);
        res.status(200).json({ expenses });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




exports.addExpense = async (req, res, next) => {
    try {
        const { name, amount } = req.body;
        const newExpense = await Expense.create({ name, amount });
        console.log(newExpense);
        res.status(201).json({ newExpense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.editExpense = async (req, res, next) => {
    try {
      const id = req.params.id;
      const expense = await Expense.findByPk(id);
  
      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }
  
      res.status(200).json({ expense });
    } catch (error) {

      console.log(error);
      
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.updateExpense = async (req, res, next) => {
    try {
      const id = req.params.id;
      const { name, amount } = req.body;
  
      const expense = await Expense.findByPk(id);
  
      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }
  
      expense.name = name;
      expense.amount = amount;
  
      await expense.save();
  
      res.status(200).json({ message: 'Expense updated successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

exports.deleteExpense = async (req, res, next) => {
    try {
        const id = req.params.id; 
        const expense = await Expense.findByPk(id);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        
        
        await expense.destroy();
        
        res.status(200).json({ message: 'Expense deleted successfully' });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'});
    }

};