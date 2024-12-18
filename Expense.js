// Select elements
const expenseForm = document.getElementById('expense-form');
const expenseTable = document.getElementById('expense-table').querySelector('tbody');
const totalExpenseEl = document.getElementById('total-expense');
const totalBalanceEl = document.getElementById('total-balance');
const totalIncomeEl = document.getElementById('total-income');
const totalSavingsEl = document.getElementById('total-savings');

document.addEventListener('DOMContentLoaded', loadExpenses);

function signOutBtn(){
    window.location.href = './LoginSignUp.html'
}

expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = document.getElementById('expense-type').value;
    const name = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const date = document.getElementById('expense-date').value;
    const category = document.getElementById('expense-category').value;

    // Validate inputs
    if (!type || !name || isNaN(amount) || amount <= 0 || !date || !category) {
        alert('Please fill in all fields with valid data.');
        return;
    }

    const expense = { id: Date.now(), type, name, amount, date, category };

    saveExpense(expense);
    addExpenseToTable(expense);
    updateTotals();

    expenseForm.reset();
});

function saveExpense(expense) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(addExpenseToTable);
    updateTotals();
}

function addExpenseToTable(expense) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${expense.type}</td>
        <td>${expense.name}</td>
        <td>${expense.amount.toFixed(2)}</td>
        <td>${expense.date}</td>
        <td>${expense.category}</td>
        <td>
            <button class="delBtn" onclick="deleteExpense(${expense.id})">Delete</button>
        </td>
    `;
    expenseTable.appendChild(row);
}

function updateTotals() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    
    const totalExpense = expenses
        .filter(expense => expense.type === 'Expense')
        .reduce((sum, expense) => sum + expense.amount, 0);

    const totalIncome = expenses
        .filter(expense => expense.type === 'Income')
        .reduce((sum, expense) => sum + expense.amount, 0);

    const totalSavings = expenses
        .filter(expense => expense.type === 'Savings')
        .reduce((sum, expense) => sum + expense.amount, 0);

    const Income = (totalIncome - totalSavings) - totalExpense;
    const balance = (Income +totalSavings)

    totalExpenseEl.textContent = totalExpense.toFixed(2);
    totalIncomeEl.textContent = Income.toFixed(2);
    totalBalanceEl.textContent = balance.toFixed(2);
    totalSavingsEl.textContent = totalSavings.toFixed(2);
}

function deleteExpense(id) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const filteredExpenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(filteredExpenses));

    expenseTable.innerHTML = ''; // Clear the table
    loadExpenses(); // Reload the table and totals
}
