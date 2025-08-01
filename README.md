# 💸 Personal Finance Visualizer

A full-stack web application to track and visualize your personal financial transactions year-wise. Easily monitor your expenses, see category-wise breakdowns, and stay in control of your money.

## 📊 Features

- ✅ Add, view, and manage transactions
- 📅 Year-wise filtering of data
- 📌 Predefined categories for consistency
- 🧠 Dashboard showing:
  - Total expenses
  - Top spending category
  - Total transactions
  - Category-wise Pie Chart
  - 5 Most Recent Transactions
- ⚡ Fast, clean UI with modern design


## 🛠️ Tech Stack

| Layer           | Tech                                                 |
|-----------------|------------------------------------------------------|
| Frontend        | **Next.js (App Router), TypeScript, Tailwind CSS**   |
| Backend         | **Node.js, API Routes, MongoDB, Mongoose**           |
| Charts          | **Recharts**                                         |
| UI Components   | **shadcn/ui**                                        |
| Auth (optional) | **Clerk**                                            |
| State Mgmt      | **Context API**                                      |


## 📁 Project Structure

```bash
src/
│
├── app/                     # Next.js App Router pages
│   ├── api/                # Backend API route handlers
│   ├── Dashboard/          # Dashboard page
│   ├── Transactions/       # View and manage transactions
│   └── Expense/            # Monthly expenses visualization
│
├── components/             # Reusable UI components
│   └── ui/                 # shadcn-based UI elements
│
├── context/                # TransactionContext for global state
│
├── lib/                    # Utility functions and configs
│   ├── db.ts               # MongoDB connection setup
│   └── validations/        # Zod validation schemas
│
├── models/                 # Mongoose models
│   └── transaction.model.ts
│
└── styles/                 # Global styles (TailwindCSS)
    └── globals.css
```


## 🧪 Setup Locally

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/personal-finance-visualizer.git
cd personal-finance-visualizer
```


## Install dependencies 

```bash
npm install
```


## Add Environment Variables

Create a .env.local file in the root and include:

```bash
DB_URI=mongodb+srv://dshivank630:xHmJPMQ3wF0qgsNv@cluster0.hgxaeec.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```
🛡️ Make sure not to commit your .env.local to GitHub.


## Run the development server 

```bash
npm run dev
```

App will be running at: http://localhost:3000


## 🧠 Learnings & Goals

✅ Practiced full-stack architecture with Next.js App Router

📊 Implemented MongoDB aggregation for powerful dashboard analytics

📈 Used Recharts to visually represent financial data

🎨 Focused on reusable components and crafted a clean UI using Tailwind CSS + shadcn/ui

💡 Gained deeper understanding of API routes, global state, and data filtering by year


## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.


## ✨ Author
Shivank Dixit

💼 LinkedIn : https://www.linkedin.com/in/shivank-dixit-43170024a/

🚀 GitHub : https://github.com/shivankdixit111

