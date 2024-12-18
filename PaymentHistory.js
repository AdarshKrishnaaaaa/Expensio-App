const historyList = document.getElementById("history-list");
        const filter = document.getElementById("filter");
    
        // Check for existing expenses in localStorage or use an empty array
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

        function signOutBtn(){
            window.location.href = './LoginSignUp.html'
        }
    
        // Function to validate and render expenses
        function renderExpenses(filteredExpenses) {
            historyList.innerHTML = ""; // Clear the list
            filteredExpenses.forEach((expense) => {
                // Validate each expense object
                if (expense.type && expense.name && expense.amount && expense.date && expense.category) {
                    const listItem = document.createElement("li");
                    listItem.className = expense.type; // Use type for styling
                    listItem.innerHTML = `
                        <span><strong>${expense.name}</strong> (${expense.category})</span>
                        <span>${expense.type.toUpperCase()}</span>
                        <span>${expense.amount} /-</span>
                        <span>${expense.date}</span>
                    `;
                    historyList.appendChild(listItem);
                } else {
                    console.warn("Skipping invalid expense:", expense);
                }
            });
        }
    
        // Function to filter expenses
        function filterExpenses() {
            const filterValue = filter.value;
            const filtered = filterValue === "all" ? expenses : expenses.filter((expense) => expense.type === filterValue);
            renderExpenses(filtered);
        }
    
        // Save expenses to localStorage
        function saveExpenses() {
            localStorage.setItem("expenses", JSON.stringify(expenses));
        }
    
        // Add a new expense
        function addExpense(type, name, amount, date, category) {
            if (type && name && amount && date && category) {
                const newExpense = {
                    id: Date.now(),
                    type,
                    name,
                    amount,
                    date,
                    category,
                };
                expenses.push(newExpense);
                saveExpenses();
                filterExpenses(); // Re-render based on the current filter
            } else {
                console.error("Invalid expense details. Expense not added.");
            }
        }
    
        // Initial rendering
        filterExpenses();
    
        // Event listener for filter
        filter.addEventListener("change", filterExpenses);