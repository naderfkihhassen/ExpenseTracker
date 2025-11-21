const form = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expensesEl = document.getElementById("expenses");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

document.getElementById("date").valueAsDate = new Date();

displayTransactions();
updateBalance();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  const transaction = {
    id: Date.now(), 
    description: description,
    amount: amount,
    type: type,
    category: category,
    date: date,
  };

  transactions.push(transaction);

  localStorage.setItem("transactions", JSON.stringify(transactions));

  form.reset();
  document.getElementById("date").valueAsDate = new Date();

  displayTransactions();
  updateBalance();
});

function displayTransactions() {
  transactionList.innerHTML = "";

  if (transactions.length === 0) {
    transactionList.innerHTML =
      '<p class="empty-message">No transactions yet. Add one above!</p>';
    return;
  }

  transactions.forEach((transaction) => {
    const item = document.createElement("div");
    item.className = `transaction-item ${transaction.type}`;

    item.innerHTML = `
      <div class="transaction-info">
        <div class="transaction-description">${transaction.description}</div>
        <div class="transaction-meta">
          <span>${transaction.category}</span>
          <span>${transaction.date}</span>
        </div>
      </div>
      <div class="transaction-amount ${transaction.type}">
        ${
          transaction.type === "income" ? "+" : "-"
        }$${transaction.amount.toFixed(2)}
      </div>
      <div class="transaction-actions">
        <button class="btn-delete" onclick="deleteTransaction(${
          transaction.id
        })">Delete</button>
      </div>
    `;

    transactionList.appendChild(item);
  });
}

function updateBalance() {
  let totalIncome = 0;
  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    }
  });

  let totalExpenses = 0;
  transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      totalExpenses += transaction.amount;
    }
  });

  const balance = totalIncome - totalExpenses;

  balanceEl.textContent = `$${balance.toFixed(2)}`;
  incomeEl.textContent = `$${totalIncome.toFixed(2)}`;
  expensesEl.textContent = `$${totalExpenses.toFixed(2)}`;
}

function deleteTransaction(id) {
  if (confirm("Delete this transaction?")) {
    transactions = transactions.filter((transaction) => transaction.id !== id);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    displayTransactions();
    updateBalance();
  }
}
