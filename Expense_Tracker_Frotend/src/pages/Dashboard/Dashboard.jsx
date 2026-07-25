import React, { useEffect, useState } from 'react';
import PieChartComponent from '../../components/charts/pieChart';

function Dashboard() {

  const [amount, setAmount] = useState("")
  const [profile, setProfile] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [isIncome, setIsIncome] = useState(false)
  const [category, setCategory] = useState("Food")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const [balance, setBalance] = useState(0)

  const incomeHandler = (e) => {
    setIsIncome(true)
    setCategory("Salary")
  }
  const expenseHandler = (e) => {
    setIsIncome(false)
    setCategory("Food")
  }


  const createTransaction = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    try {
      const res = await fetch("http://127.0.0.1:8000/transaction",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            "is_income": isIncome,
            "category": category,
            "amount": parseFloat(amount),
            "description": description,
          })
        }
      )
      if (res.ok) {
        const data = await res.json()
        setTransactions(prev => [data, ...prev])
      }
      else {
        const error = await res.json()
        setStatus(error.detail)
      }

    } catch (error) {
      setStatus(error.message)
    }
  }
  const deleteTransaction = async (id) => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`http://127.0.0.1:8000/transaction/${id}`,
        {
          method : "DELETE",
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      )
      if(res.ok){
        setTransactions(prev =>
        prev.filter(transaction => transaction.id !== id)
        )
      }
      
    } catch (error) {
      setStatus(error)
    }
  }



  // Fetch profile and transactions on mount
  useEffect(() => {
    async function getprofile() {
      const token = localStorage.getItem("token")
      const res = await fetch("http://127.0.0.1:8000/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const data = await res.json()
      console.log(data);


      setProfile(data)
    }
    const getTransaction = async () => {
      const token = localStorage.getItem("token")
      try {
        const res = await fetch("http://127.0.0.1:8000/transactions",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        )
        const data = await res.json()
        setTransactions(Array.isArray(data) ? data : [])
      } catch (error) {
        setStatus(error.message)
      }

    }

    getTransaction()
    getprofile()
  }, [])

  // Recalculate stats whenever transactions change
  useEffect(() => {
    const val1 = transactions
      .filter(t => t.is_income)
      .reduce((sum, t) => sum + t.amount, 0)
    setIncome(val1)
    const val2 = transactions
      .filter(t => !t.is_income)
      .reduce((sum, t) => sum + t.amount, 0)
    setExpense(val2)
    setBalance(val1 - val2)
  }, [transactions])




  return (
    <div className="min-h-screen bg-surface-dark text-slate-100 flex relative overflow-hidden">
      {/* ── Background Decorative Orbs ── */}
      <div className="absolute w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-30 -top-40 -left-40 pointer-events-none"
        style={{ animation: 'orbFloat1 20s ease-in-out infinite' }} />
      <div className="absolute w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] opacity-30 bottom-10 right-10 pointer-events-none"
        style={{ animation: 'orbFloat2 25s ease-in-out infinite' }} />
      <div className="absolute w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] opacity-20 top-1/3 right-1/3 pointer-events-none"
        style={{ animation: 'orbFloat3 15s ease-in-out infinite' }} />

      {/* ── Sidebar ── */}
      <aside className="w-64 border-r border-border-custom bg-surface/50 backdrop-blur-xl flex flex-col justify-between p-6 shrink-0 relative z-10 hidden md:flex">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <span className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-xl shadow-lg shadow-primary/20">
              💰
            </span>
            <span className="font-extrabold text-xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Expensy
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 text-white font-medium transition-all hover:translate-x-0.5">
              <span className="text-lg">📊</span> Dashboard
            </a>
            <a href="/transactions" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 border border-transparent text-slate-400 hover:text-white transition-all hover:translate-x-0.5">
              <span className="text-lg">💸</span> Transactions
            </a>
            <a href="/budgets" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 border border-transparent text-slate-400 hover:text-white transition-all hover:translate-x-0.5">
              <span className="text-lg">🎯</span> Budgets
            </a>
            <a href="/analytics" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 border border-transparent text-slate-400 hover:text-white transition-all hover:translate-x-0.5">
              <span className="text-lg">📈</span> Analytics
            </a>
            <a href="/loans" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 border border-transparent text-slate-400 hover:text-white transition-all hover:translate-x-0.5">
              <span className="text-lg">🏦</span> Loans & Debt
            </a>
          </nav>
        </div>

        {/* User Profile + Logout */}
        <div className="border-t border-border-custom pt-6">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-secondary flex items-center justify-center font-bold text-white shadow-md text-sm">
              {profile?.username?.slice(0, 2)?.toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-sm truncate">{profile?.username}</h4>
              <p className="text-xs text-slate-500 truncate">{profile?.email}</p>
            </div>
          </div>
          <a href="/auth" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-rose-500/10 border border-transparent text-slate-500 hover:text-rose-400 transition-all text-sm">
            <span className="text-base">🚪</span> Logout
          </a>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 overflow-y-auto relative z-10 p-6 md:p-10">

        {/* Status Banner */}
        {status && (
          <div className="animate-slide-down mb-6 px-4 py-3 rounded-xl text-sm font-medium bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-2">
            <span>⚠️</span> {status}
          </div>
        )}

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-slide-up">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">Welcome back, <span className="text-slate-200 font-medium">{profile?.username}</span>! Here's your financial overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-border-custom hover:bg-white/10 hover:-translate-y-0.5 text-sm font-semibold transition-all cursor-pointer">
              Export Report
            </button>
          </div>
        </header>

        {/* ── Add Transaction Card ── */}
        <div className="animate-card-entrance bg-surface/40 backdrop-blur-md border border-border-custom p-6 rounded-2xl flex flex-col mb-8 relative overflow-hidden"
          style={{ animationDelay: '100ms' }}>
          {/* Top gradient accent line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-secondary to-accent opacity-60" />
          <div className="mb-4">
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm">➕</span>
              Add Transaction
            </h3>
            <p className="text-xs text-slate-400 mt-1 ml-10">Record a new income or expense item</p>
          </div>
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {/* Type Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Type</label>
                <select
                  value={isIncome ? "income" : "expense"}
                  onChange={(e) => {
                    if (e.target.value === "income") {
                      incomeHandler();
                    } else {
                      expenseHandler();
                    }
                  }}
                  className="w-full bg-white/5 border border-border-custom rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition-all cursor-pointer"
                >
                  <option value="expense" className="bg-slate-900 text-slate-100">Expense</option>
                  <option value="income" className="bg-slate-900 text-slate-100">Income</option>
                </select>
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Category</label>
                <select
                  value={category}
                  onChange={(e) => { setCategory(e.target.value) }}
                  className="w-full bg-white/5 border border-border-custom rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition-all cursor-pointer">
                  {isIncome ? (
                    <>
                      <option value="Salary" className="bg-slate-900 text-slate-100">Salary</option>
                      <option value="Bonus" className="bg-slate-900 text-slate-100">Bonus</option>
                      <option value="Other" className="bg-slate-900 text-slate-100">Other</option>
                    </>
                  ) : (
                    <>
                      <option value="Food" className="bg-slate-900 text-slate-100">Food & Dining</option>
                      <option value="Shopping" className="bg-slate-900 text-slate-100">Shopping</option>
                      <option value="Entertainment" className="bg-slate-900 text-slate-100">Entertainment</option>
                      <option value="Utilities" className="bg-slate-900 text-slate-100">Utilities</option>
                      <option value="Travel" className="bg-slate-900 text-slate-100">Travel</option>
                      <option value="Other" className="bg-slate-900 text-slate-100">Other</option>
                    </>
                  )}
                </select>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium pointer-events-none">₹</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-border-custom rounded-xl pl-8 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition-all"
                  />
                </div>
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Description</label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  placeholder="e.g. Groceries"
                  className="w-full bg-white/5 border border-border-custom rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition-all"
                />
              </div>
            </div>

            <div className="flex justify-end mt-2">
              <button
                type="submit"
                onClick={createTransaction}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-[0_8px_25px_rgba(99,102,241,0.3)] text-white text-sm font-semibold transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                Add Transaction
              </button>
            </div>
          </form>
        </div>

        {/* ── Stats Summary Grid ── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1: Balance */}
          <div className="stat-card-primary animate-card-entrance bg-surface/40 backdrop-blur-md border border-border-custom p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-default group"
            style={{ animationDelay: '150ms' }}>
            <div className="absolute top-0 right-0 w-28 h-28 bg-primary/8 rounded-bl-[40px] pointer-events-none transition-all duration-500 group-hover:bg-primary/15 group-hover:w-32 group-hover:h-32" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-primary/5 rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Balance</span>
                <span className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">💳</span>
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight text-white mb-2 tabular-nums">₹{balance.toLocaleString('en-IN')}</h3>
              <p className={`text-xs flex items-center gap-1 font-medium ${balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                <span>{balance >= 0 ? '↑' : '↓'}</span>
                <span className="text-slate-500">current balance</span>
              </p>
            </div>
          </div>

          {/* Card 2: Income */}
          <div className="stat-card-success animate-card-entrance bg-surface/40 backdrop-blur-md border border-border-custom p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-default group"
            style={{ animationDelay: '250ms' }}>
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/8 rounded-bl-[40px] pointer-events-none transition-all duration-500 group-hover:bg-emerald-500/15 group-hover:w-32 group-hover:h-32" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-emerald-500/5 rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Income</span>
                <span className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">💰</span>
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight text-white mb-2 tabular-nums">₹{income.toLocaleString('en-IN')}</h3>
              <p className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <span>↑</span> <span className="text-slate-500">total earned</span>
              </p>
            </div>
          </div>

          {/* Card 3: Expenses */}
          <div className="stat-card-rose animate-card-entrance bg-surface/40 backdrop-blur-md border border-border-custom p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-default group"
            style={{ animationDelay: '350ms' }}>
            <div className="absolute top-0 right-0 w-28 h-28 bg-rose-500/8 rounded-bl-[40px] pointer-events-none transition-all duration-500 group-hover:bg-rose-500/15 group-hover:w-32 group-hover:h-32" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-rose-500/5 rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Expenses</span>
                <span className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">📉</span>
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight text-white mb-2 tabular-nums">₹{expense.toLocaleString('en-IN')}</h3>
              <p className="text-xs text-rose-400 flex items-center gap-1 font-medium">
                <span>↓</span> <span className="text-slate-500">total spent</span>
              </p>
            </div>
          </div>

          {/* Card 4: Transactions Count */}
          <div className="stat-card-secondary animate-card-entrance bg-surface/40 backdrop-blur-md border border-border-custom p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-default group"
            style={{ animationDelay: '450ms' }}>
            <div className="absolute top-0 right-0 w-28 h-28 bg-secondary/8 rounded-bl-[40px] pointer-events-none transition-all duration-500 group-hover:bg-secondary/15 group-hover:w-32 group-hover:h-32" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-secondary/5 rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Transactions</span>
                <span className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">📋</span>
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight text-white mb-2 tabular-nums">{transactions.length}</h3>
              <p className="text-xs text-secondary flex items-center gap-1 font-medium">
                <span>📊</span> <span className="text-slate-500">all time</span>
              </p>
            </div>
          </div>
        </section>

        {/* ── Main Grid: Charts ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* Spending Trends Placeholder */}
          <div className="animate-card-entrance bg-surface/40 backdrop-blur-md border border-border-custom p-6 rounded-2xl flex flex-col h-[300px]"
            style={{ animationDelay: '500ms' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-white">Spending Trends</h3>
                <p className="text-xs text-slate-400">Overview of expenses over time</p>
              </div>
              <div className="flex bg-white/5 rounded-lg p-0.5 border border-border-custom text-xs text-slate-400">
                <span className="px-2.5 py-1 bg-primary text-white rounded-md font-medium">Weekly</span>
                <span className="px-2.5 py-1 hover:text-white cursor-pointer transition-colors">Monthly</span>
              </div>
            </div>

            {/* Graphic Chart Placeholder Div */}
            <div className="flex-1 border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center bg-white/[0.02] text-center p-6">
              <span className="text-3xl mb-2">📈</span>
              <span className="font-semibold text-slate-300">Spending Trends Chart</span>
              <span className="text-xs text-slate-500 max-w-[240px] mt-1">
                Line chart visualizing weekly income vs. expense flow
              </span>
            </div>
          </div>

          {/* Category Breakdown Placeholder */}
          <div className="animate-card-entrance bg-surface/40 backdrop-blur-md border border-border-custom p-6 rounded-2xl flex flex-col h-[300px]"
            style={{ animationDelay: '600ms' }}>
            <div>
              <h3 className="font-bold text-lg text-white">Expense Categories</h3>
              <p className="text-xs text-slate-400">Distribution of your spending</p>
            </div>

            {/* Graphic Chart Placeholder Div */}
            <div className="flex-1 mt-4 w-full h-full flex items-center justify-center">
              <PieChartComponent transactions={transactions} />
            </div>
          </div>

        </div>

        {/* ── Budgets Progress Bars ── */}
        <section className="animate-card-entrance bg-surface/40 backdrop-blur-md border border-border-custom p-6 rounded-2xl"
          style={{ animationDelay: '650ms' }}>
          <div className="mb-6">
            <h3 className="font-bold text-lg text-white">Monthly Budgets</h3>
            <p className="text-xs text-slate-400">Track and manage category limits</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Category 1 */}
            <div className="bg-white/[0.02] border border-border-custom p-4.5 rounded-xl transition-all duration-300 hover:bg-white/[0.04] hover:border-primary/20">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-slate-200">🍔 Food & Dining</span>
                <span className="text-xs text-slate-400 tabular-nums">$240 / $500</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full transition-all duration-700" style={{ width: '48%' }} />
              </div>
              <p className="text-[10px] text-slate-500 mt-1.5">48% used</p>
            </div>

            {/* Category 2 */}
            <div className="bg-white/[0.02] border border-border-custom p-4.5 rounded-xl transition-all duration-300 hover:bg-white/[0.04] hover:border-amber-500/20">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-slate-200">🛍️ Shopping</span>
                <span className="text-xs text-slate-400 tabular-nums">$320 / $400</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full transition-all duration-700" style={{ width: '80%' }} />
              </div>
              <p className="text-[10px] text-amber-400/60 mt-1.5">⚠️ 80% used</p>
            </div>

            {/* Category 3 */}
            <div className="bg-white/[0.02] border border-border-custom p-4.5 rounded-xl transition-all duration-300 hover:bg-white/[0.04] hover:border-rose-500/20">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-slate-200">🎬 Entertainment</span>
                <span className="text-xs text-slate-400 tabular-nums">$180 / $200</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full transition-all duration-700" style={{ width: '90%' }} />
              </div>
              <p className="text-[10px] text-rose-400/60 mt-1.5">🔴 90% used — near limit</p>
            </div>

            {/* Category 4 */}
            <div className="bg-white/[0.02] border border-border-custom p-4.5 rounded-xl transition-all duration-300 hover:bg-white/[0.04] hover:border-success/20">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-slate-200">🚗 Transportation</span>
                <span className="text-xs text-slate-400 tabular-nums">$80 / $300</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-success h-full rounded-full transition-all duration-700" style={{ width: '26%' }} />
              </div>
              <p className="text-[10px] text-slate-500 mt-1.5">26% used</p>
            </div>
          </div>
        </section>

        {/* ── Recent Transactions ── */}
        <section className="animate-card-entrance bg-surface/40 backdrop-blur-md border border-border-custom p-6 rounded-2xl mt-8"
          style={{ animationDelay: '700ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg text-white">Recent Transactions</h3>
              <p className="text-xs text-slate-400">Your latest spending activity</p>
            </div>
            <span className="text-xs text-slate-500 bg-white/5 px-3 py-1.5 rounded-lg border border-border-custom tabular-nums">
              {transactions.length} total
            </span>
          </div>

          {/* Empty State or Transactions Grid */}
          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
              <span className="text-5xl mb-4">📭</span>
              <h4 className="font-semibold text-lg text-slate-300 mb-1">No transactions yet</h4>
              <p className="text-sm text-slate-500 text-center max-w-xs">Add your first transaction above to start tracking your finances</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {transactions.map((transaction, index) => {
                // Format date string to local: YYYY-MM-DD HH:MM
                let formattedTime = "";
                try {
                  if (transaction.time) {
                    // Ensure the UTC timezone indicator is appended if not present
                    const timeString = transaction.time.endsWith('Z') || transaction.time.includes('+')
                      ? transaction.time 
                      : transaction.time + 'Z';
                    
                    const dateObj = new Date(timeString);
                    if (!isNaN(dateObj.getTime())) {
                      const year = dateObj.getFullYear();
                      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                      const day = String(dateObj.getDate()).padStart(2, '0');
                      const hours = String(dateObj.getHours()).padStart(2, '0');
                      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
                      formattedTime = `${year}-${month}-${day} ${hours}:${minutes}`;
                    }
                  }
                } catch (e) {
                  console.error(e);
                }

                return (
                  <div
                    key={transaction.id}
                    className={`animate-card-entrance p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 ${transaction.is_income
                        ? 'tx-card-income bg-emerald-500/[0.04] border-emerald-500/15 hover:bg-emerald-500/[0.08] hover:shadow-emerald-500/10'
                        : 'tx-card-expense bg-rose-500/[0.04] border-rose-500/15 hover:bg-rose-500/[0.08] hover:shadow-rose-500/10'
                      }`}
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${transaction.is_income ? 'bg-emerald-500/10' : 'bg-rose-500/10'
                        }`}>
                        {({ Food: '🍔', Shopping: '🛍️', Entertainment: '🎬', Utilities: '⚡', Travel: '✈️', Salary: '💼', Bonus: '🎁', Other: '📌' })[transaction.category] || '💸'}
                      </span>
                      <div className="min-w-0 flex-1 md:flex md:items-center md:justify-between md:gap-8">
                        <div>
                          <h4 className="font-semibold text-sm text-white truncate">{transaction.category}</h4>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{transaction.description || 'No description'}</p>
                        </div>
                        <div className="text-left md:text-right mt-1 md:mt-0">
                          <p className="text-xs text-slate-400">{formattedTime}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-white/5 pt-3 md:pt-0 shrink-0">
                      <p className={`font-bold text-base tabular-nums ${transaction.is_income ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {transaction.is_income ? '+' : '−'} ₹{transaction.amount?.toLocaleString('en-IN')}
                      </p>
                      <button 
                        onClick= { ()=>{deleteTransaction(transaction.id)} }
                        className="p-1.5 rounded-md text-[10px] bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 hover:border-rose-500 text-rose-400 hover:text-white transition-all cursor-pointer opacity-80 hover:opacity-100"
                        title="Delete Transaction"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
