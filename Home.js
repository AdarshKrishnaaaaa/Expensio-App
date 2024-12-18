const menuBtn = document.getElementById('menuBtn');
        const navItems = document.getElementById('navItems');

        menuBtn.addEventListener('click', () => {
            navItems.classList.toggle('active');
        });

        function signOutBtn(){
            window.location.href = './LoginSignUp.html'
        }

        // Fetch transactions from localStorage
        const transactions = JSON.parse(localStorage.getItem('expenses')) || [];

        // Function to Calculate Totals
        function calculateTotals() {
            let totalExpense = 0;
            let Income = 0;
            let Savings = 0;

            transactions.forEach(transaction => {
                if (transaction.type === 'Expense') {
                    totalExpense += transaction.amount;
                } else if (transaction.type === 'Income') {
                    Income += transaction.amount;
                } else if (transaction.type === 'Savings') {
                    Savings += transaction.amount;
                }
            });

            const totalIncome = (Income - Savings) - totalExpense;
            const netWorth = totalIncome + Savings;

            document.getElementById('totalExpense').textContent = `₹ ${totalExpense}`;
            document.getElementById('totalIncome').textContent = `₹ ${totalIncome}`;
            document.getElementById('netWorth').textContent = `₹ ${netWorth}`;
            document.getElementById('Name').innerHTML = sessionStorage.getItem('userName');

            return { totalExpense, totalIncome };
        }

        // Function to Render Chart
        function renderChart() {
            const { totalExpense, totalIncome } = calculateTotals();

            const ctx = document.getElementById('expenseIncomeChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Total Expense', 'Total Income'],
                    datasets: [{
                        data: [totalExpense, totalIncome],
                        backgroundColor: ['#F87171', '#4ADE80'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#FFFFFF',
                                font: {
                                    size: 14,
                                    family: 'Arial',
                                    weight: 'bold'
                                },
                                padding: 20
                            }
                        }
                    }
                }
            });
        }

        // Initialize
        calculateTotals();
        renderChart();