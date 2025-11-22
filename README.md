# 💰 Expense Tracker

A simple, intuitive web application to track your income and expenses, manage your budget, and visualize your spending habits.  
Built with **HTML**, **CSS**, and **JavaScript** — no frameworks, no dependencies.

---

## 🌐 Live Demo

`https://naderfkihhassen.github.io/ExpenseTracker/`

---

## ✨ Features

### ✔ Add & Manage Transactions
- Record income and expenses with description, amount, category, and date
- Edit or delete any transaction
- Clear all transactions with confirmation

### ✔ Real-Time Balance Overview
- See current balance (Income - Expenses)
- Total income displayed in green
- Total expenses displayed in red
- Updates automatically with each transaction

### ✔ Smart Filtering
- View all transactions
- Filter by income only
- Filter by expenses only

### ✔ Category Breakdown
- Visual progress bars showing spending by category
- Sorted by highest spending first
- Categories: Salary, Freelance, Food, Transport, Entertainment, Bills, Shopping, Other

### ✔ Data Persistence
- All data saved to **localStorage**
- Transactions persist between sessions
- Works completely offline

### ✔ Responsive Design
- Adapts seamlessly to mobile, tablet, and desktop
- Touch-friendly buttons and inputs
- Clean, modern interface

---

## 🛠️ Tech Stack

- **HTML5** - Semantic markup with forms and accessibility
- **CSS3** - Modern layout with Grid, Flexbox, and animations
- **JavaScript (ES6+)** - Array methods, localStorage, DOM manipulation
- **No external libraries** - Pure vanilla JavaScript

---

## 🚀 Getting Started

### Clone the repository
```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

### Open in browser
Simply open `index.html` in your web browser.

**Or use a local server:**
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server
```

Then navigate to `http://localhost:8000`

---

## 📖 Usage

### Adding a Transaction

1. Fill in the form fields:
   - **Description** - e.g., "Grocery shopping", "Monthly salary"
   - **Amount** - Enter the value (e.g., 45.99)
   - **Type** - Select Income or Expense
   - **Category** - Choose from dropdown menu
   - **Date** - Pick a date

2. Click **"Add Transaction"**

3. Transaction appears in the list and balance updates instantly

### Managing Transactions

- **Edit** - Click "Edit" button, form fills with existing data, modify and save
- **Delete** - Click "Delete" button with confirmation
- **Filter** - Use filter buttons to view All / Income / Expenses
- **Clear All** - Remove all transactions (requires confirmation)

### Understanding the Display

**Balance Card:**
- Balance = Income - Expenses
- Green value = positive balance
- Red value = negative balance

**Category Summary:**
- Shows only expense categories
- Bar width represents relative spending
- Largest category = 100% width
- Amount displayed on the right

---

## 📁 Project Structure

```
expense-tracker/
│
├── index.html          # Main HTML structure
├── style.css           # All styles and responsive design
├── script.js           # Application logic and functionality
└── README.md           # Project documentation
```

---

## 🎨 Customization

### Change Color Scheme

Edit CSS variables in `style.css`:
```css
:root {
  --bg: #f7f8fb;           /* Background color */
  --card: #ffffff;         /* Card background */
  --accent: #667eea;       /* Primary accent color */
  --income-color: #10b981; /* Income green */
  --expense-color: #ef4444;/* Expense red */
}
```

### Add New Categories

In `index.html`, modify the category select:
```html
<select id="category" required>
    <option value="salary">Salary</option>
    <option value="food">Food</option>
    <option value="your-category">Your Category</option>
    <!-- Add more here -->
</select>
```

### Modify Default Values

In `script.js`:
```javascript
// Change default date to past/future
dateInput.valueAsDate = new Date('2024-01-01');

// Set default transaction type
typeInput.value = 'expense'; // or 'income'
```

---

## 🔑 Key Concepts

### localStorage API
Stores data in the browser permanently:
```javascript
// Save
localStorage.setItem('transactions', JSON.stringify(transactions));

// Load
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
```

### Array Methods Used
- **filter()** - Filter transactions by type
- **reduce()** - Calculate total income/expenses
- **map()** - Create HTML for each transaction
- **find()** - Find transaction by ID
- **sort()** - Sort by date or amount

### Balance Calculation
```javascript
const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

const balance = income - expenses;
```

---

## 📊 Data Storage

### localStorage Structure
```json
{
  "transactions": [
    {
      "id": 1699564820000,
      "description": "Grocery shopping",
      "amount": 45.99,
      "type": "expense",
      "category": "food",
      "date": "2024-11-21"
    }
  ]
}
```

### Storage Limits
- **Size**: ~5-10 MB per domain (varies by browser)
- **Capacity**: Approximately 50,000-100,000 transactions
- **Scope**: Data is device-specific and doesn't sync

---

## 🐛 Known Limitations

- Data is stored locally (not synced across devices)
- No user authentication or multi-user support
- Browser's localStorage can be cleared manually
- Limited to text data (no image attachments)
- No automatic backup functionality

---

## 🚀 Future Enhancements

- [ ] Export transactions to CSV/Excel
- [ ] Import data from files
- [ ] Monthly budget limits with alerts
- [ ] Charts and graphs (Chart.js)
- [ ] Recurring transactions support
- [ ] Multiple wallets/accounts
- [ ] Dark mode toggle
- [ ] Search and advanced filtering
- [ ] Print-friendly reports
- [ ] Currency conversion support

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Nader Fkih Hassen**
- GitHub: [@naderfkihhassen](https://github.com/naderfkihhassen)
- LinkedIn: [Nader Fkih Hassen](https://linkedin.com/in/nader-fkih-hassen)
- Portfolio: [naderfkihhassen.github.io/Portfolio](https://naderfkihhassen.github.io/Portfolio/)

---

## 🙏 Acknowledgments

- Built as a learning project for JavaScript and localStorage
- Inspired by personal budget management needs
- No external libraries used — pure vanilla JavaScript

---

## 📞 Support

Found a bug or have a suggestion? Please [open an issue](https://github.com/yourusername/expense-tracker/issues).

---

