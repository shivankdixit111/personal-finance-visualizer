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

src/
│
├── app/ # Next.js App Router Pages
│   |
│   └──api/ # All backend route handlers (API endpoints)
│   |
│   └── /Dashboard → Main Dashboard page
│        /Transactions → View and manage transactions
│        /Expense → Monthly expenses visualization
|
│
├── components/ # Reusable UI components
│ └── ui/ # Shadcn-based UI elements
│
├── context/ # TransactionContext for global state
│
├── lib/ # Database connection logic
│
├── models/ # Mongoose Models (Transaction)
│
└── styles/ # Global CSS



## 🧪 Setup Locally

### 1️⃣ Clone the repo

git clone https://github.com/your-username/personal-finance-visualizer.git
cd personal-finance-visualizer


## Install dependencies 

npm install


## Add Environment Variables
Create a .env.local file in the root and include:

DB_URI=mongodb+srv://dshivank630:xHmJPMQ3wF0qgsNv@cluster0.hgxaeec.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
 

## Run the development server 
npm run dev

App will be running at: http://localhost:3000


## 🧠 Learnings & Goals
Practiced full-stack architecture with Next.js App Router

Implemented MongoDB aggregation for dashboard analytics

Used Recharts to display financial data visually

Prioritized component reusability and clean UI with Tailwind + shadcn


## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

## ✨ Author
Shivank Dixit

💼 LinkedIn

🚀 GitHub

