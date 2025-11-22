const form = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expensesEl = document.getElementById("expenses");

const transactionList = document.getElementById("transaction-list");
const filterBtns = document.querySelectorAll(".filter-btn");
const clearAllBtn = document.getElementById("clear-all");
const categorySummary = document.getElementById("category-summary");

dateInput.valueAsDate = new Date();

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let currentFilter = "all";

init();

function init() {
  displayTransactions();
  updateBalance();
  updateCategorySummary();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    description: descriptionInput.value,
    amount: parseFloat(amountInput.value),
    type: typeInput.value,
    category: categoryInput.value,
    date: dateInput.value,
  };

  transactions.push(transaction);
  saveToLocalStorage();

  form.reset();
  dateInput.valueAsDate = new Date();

  displayTransactions();
  updateBalance();
  updateCategorySummary();
});

function displayTransactions() {
  let filteredTransactions = transactions;

  if (currentFilter === "income") {
    filteredTransactions = transactions.filter((t) => t.type === "income");
  } else if (currentFilter === "expense") {
    filteredTransactions = transactions.filter((t) => t.type === "expense");
  }

  filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filteredTransactions.length === 0) {
    transactionList.innerHTML =
      '<p class="empty-message">No transactions found.</p>';
    return;
  }

  transactionList.innerHTML = filteredTransactions
    .map(
      (transaction) => `
        <div class="transaction-item ${transaction.type}">
            <div class="transaction-info">
                <div class="transaction-description">${
                  transaction.description
                }</div>
                <div class="transaction-meta">
                    <span>${transaction.category}</span>
                    <span>${formatDate(transaction.date)}</span>
                </div>
            </div>
            <div class="transaction-amount ${transaction.type}">
                ${
                  transaction.type === "income" ? "+" : "-"
                }$${transaction.amount.toFixed(2)}
            </div>
            <div class="transaction-actions">
                <button class="btn-edit" onclick="editTransaction(${
                  transaction.id
                })">Edit</button>
                <button class="btn-delete" onclick="deleteTransaction(${
                  transaction.id
                })">Delete</button>
            </div>
        </div>
    `
    )
    .join("");
}

function updateBalance() {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  balanceEl.textContent = `$${balance.toFixed(2)}`;
  incomeEl.textContent = `$${income.toFixed(2)}`;
  expensesEl.textContent = `$${expenses.toFixed(2)}`;
}

function updateCategorySummary() {
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  if (expenseTransactions.length === 0) {
    categorySummary.innerHTML =
      '<p class="empty-message">No expenses to show.</p>';
    return;
  }

  const categoryTotals = {};
  expenseTransactions.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const maxAmount = Math.max(...Object.values(categoryTotals));

  categorySummary.innerHTML = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([category, amount]) => {
      const percentage = (amount / maxAmount) * 100;
      return `
                <div class="category-item">
                    <div class="category-name">${category}</div>
                    <div class="category-bar-container">
                        <div class="category-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                    <div class="category-amount">$${amount.toFixed(2)}</div>
                </div>
            `;
    })
    .join("");
}

function deleteTransaction(id) {
  if (confirm("Are you sure you want to delete this transaction?")) {
    transactions = transactions.filter((t) => t.id !== id);
    saveToLocalStorage();
    displayTransactions();
    updateBalance();
    updateCategorySummary();
  }
}

function editTransaction(id) {
  const transaction = transactions.find((t) => t.id === id);

  descriptionInput.value = transaction.description;
  amountInput.value = transaction.amount;
  typeInput.value = transaction.type;
  categoryInput.value = transaction.category;
  dateInput.value = transaction.date;

  deleteTransaction(id);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    displayTransactions();
  });
});

clearAllBtn.addEventListener("click", () => {
  if (
    confirm(
      "Are you sure you want to delete ALL transactions? This cannot be undone!"
    )
  ) {
    transactions = [];
    saveToLocalStorage();
    displayTransactions();
    updateBalance();
    updateCategorySummary();
  }
});

function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

function saveToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
