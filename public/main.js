window.addEventListener('load', function() {
    populateTable();
  });


  const expenseForm = document.getElementById('expenseForm');
const expenseTableBody = document.getElementById('expenseTableBody');
const totalExpensesSpan = document.getElementById('totalExpenses');
let totalExpenses = 0;



function calculateTotalExpenses(expenses) {
    let total = 0;
    expenses.forEach(expense => {
      total += expense.amount;
    });
    return total;
  }

  expenseForm.addEventListener('submit', function(event) {
    addExpense(event);
  });
  
  
  function addExpense(event) {
    event.preventDefault();
  
  
    const name = document.getElementById('expenseName').value;
    const amountInput = document.getElementById('expenseAmount');
    const amount = parseFloat(amountInput.value);
   // const entryKey = `entry_${Date.now()}`;
    
    if (name && !isNaN(amount)) {
      const data = {
        name: name,
        amount: amount
        
      };
  
      axios.post('http://localhost:3000/add-expense', data, {
      headers: {
        'Content-Type': 'application/json' 
      } 
    })
      .then( response => {
        console.log(response.data);
        
        document.getElementById('expenseName').value = '';
        amountInput.value = '';
        expenseTableBody.innerHTML = '';
        populateTable();
       
  
      })
      .catch(err => {
        console.log(err);
      });
    }
  }


function populateTable() {

  axios.get('http://localhost:3000/all-expenses')

  .then(response => {
     console.log(response.data)

    if(response.data && response.data.expenses && Array.isArray(response.data.expenses)) {

      const expenses = response.data.expenses;
      expenses.forEach((expense, index) => {
      const newRow = createTableRow(expense, index + 1 );
      
      expenseTableBody.appendChild(newRow);
      // totalExpenses +=expense.amount;
      });
      totalExpenses = calculateTotalExpenses(expenses);
      totalExpensesSpan.textContent = `$${totalExpenses.toFixed(2)}`;
   } 
   else {
 
    console.log('invalid response data structure');

  }

})
  .catch(err => {
      console.log(err);
  });


      
  function createTableRow(expense, index) {

      const newRow = document.createElement('tr');

  newRow.setAttribute('data-entry-key', expense.id);

   const numberCell = document.createElement('td');
  numberCell.textContent = index;
  newRow.appendChild(numberCell);

  const nameCell = document.createElement('td');
  nameCell.textContent = expense.name;
  newRow.appendChild(nameCell);

  const amountCell = document.createElement('td');

  if (typeof expense.amount === 'number') {
    amountCell.textContent = `$${expense.amount.toFixed(2)}`;
  } else {
    amountCell.textContent = 'Invalid Amount';
  }

   newRow.appendChild(amountCell);

   const manageCell = document.createElement('td');
   const editButton = document.createElement('button');
   editButton.textContent = 'Edit';
   editButton.addEventListener('click', function(event) {
    editExpense(expense.id, event);
      });
      
      manageCell.appendChild(editButton);
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function() {
        deleteExpense(expense.id, expense.amount);
        console.log(expense.id);
      });
      manageCell.appendChild(deleteButton);
      
      newRow.appendChild(manageCell);



  // ... (manageCell with edit and delete buttons) ...

  return newRow;

  }

  function editExpense(id, event) {
    event.preventDefault();
    axios.get(`http://localhost:3000/edit-Expense/${id}`)
    .then(response => {
      const expense = response.data.expense;
      console.log(expense);
      
      // Populate form fields with existing data
      document.getElementById('expenseName').value = expense.name;
      document.getElementById('expenseAmount').value = expense.amount;
      
      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save Changes';
      saveButton.type = 'button';
      saveButton.addEventListener('click', function() {
        saveChanges(id);
      });
  
      const addButton = document.querySelector('#expenseForm button[type="submit"]');
      addButton.parentNode.replaceChild(saveButton, addButton);
    })
    .catch(error => {
      console.error('Error fetching expense:', error);
    });
}

  function saveChanges(id) {
      const newName = document.getElementById('expenseName').value;
      const newAmountInput = document.getElementById('expenseAmount');
      const newAmount = parseFloat(newAmountInput.value);
      

if (newName && !isNaN(newAmount)) {
  const data = {
    name: newName,
    amount: newAmount
  };
  console.log(data);

  axios.put(`http://localhost:3000/edit-expense/${id}`, data)
    .then(response => {
      console.log('Expense updated successfully:', response.data);
      document.getElementById('expenseName').value = '';
      newAmountInput.value = '';
      expenseTableBody.innerHTML = '';
      populateTable();


  })
    .catch(error => {
      console.error('Error updating expense:', error);
    });
}
}



function deleteExpense(id, expenseAmount) {
  console.log(id);
  axios.delete(`/delete-expense/${id}`) 
  .then(response => {
    console.log(response.data);
    totalExpenses -= expenseAmount;
        totalExpensesSpan.textContent = `$${totalExpenses.toFixed(2)}`;
        expenseTableBody.innerHTML = '';
        populateTable();
        
  })

  .catch(error => {
    console.error('Error deleting expense:', error);
  });
 


}

}
