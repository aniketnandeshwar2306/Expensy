import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config/api';

function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [isIncome, setIsIncome] = useState(false);
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [searchbar, setSearchbar] = useState("")
  const [typeFilter, setTypeFilter] = useState("all") // "all" | "income" | "expense"

  const clean_search = searchbar.toLowerCase().trim()
  const filtered_transactions = transactions
    .filter(tx => typeFilter === "all" ? true : typeFilter === "income" ? tx.is_income === true : tx.is_income === false)
    .filter(tx => tx.category.toLowerCase().trim().includes(clean_search) || (tx.description ? tx.description.toLowerCase().trim().includes(clean_search) : false))
  const createTransaction = async (e) => {
    if (e) e.preventDefault();
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${API_URL}/transaction`,
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
        // Reset states
        setAmount("");
        setDescription("");
        setIsModalOpen(false);
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
      const res = await fetch(`${API_URL}/transaction/${id}`,
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
      setStatus(error.message || "Error deleting")
    }
  }

  useEffect(() => {
    const getTransaction = async () => {
      const token = localStorage.getItem("token")
      try {
        const res = await fetch(`${API_URL}/transactions`,
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
  }, [])

  return (
    <div className="min-h-screen bg-surface-dark text-slate-100 flex relative overflow-hidden">
      {/* Background Decorative Orbs */}
      <div className="absolute w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-30 -top-40 -left-40 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px] opacity-30 bottom-10 right-10 pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-64 border-r border-border-custom bg-surface/50 backdrop-blur-xl flex flex-col justify-between p-6 shrink-0 relative z-10 hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-10 px-2">
            <span className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-xl shadow-lg shadow-primary/20">💰</span>
            <span className="font-extrabold text-xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Expensy</span>
          </div>

          <nav className="flex flex-col gap-2">
            <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 border border-transparent text-slate-400 hover:text-white transition-all">
              <span className="text-lg">📊</span> Dashboard
            </a>
            <a href="/transactions" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 text-white font-medium transition-all">
              <span className="text-lg">💸</span> Transactions
            </a>
            <a href="/budgets" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 border border-transparent text-slate-400 hover:text-white transition-all">
              <span className="text-lg">🎯</span> Budgets
            </a>
            <a href="/analytics" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 border border-transparent text-slate-400 hover:text-white transition-all">
              <span className="text-lg">📈</span> Analytics
            </a>
            <a href="/loans" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 border border-transparent text-slate-400 hover:text-white transition-all">
              <span className="text-lg">🏦</span> Loans & Debt
            </a>
          </nav>
        </div>

        <div className="border-t border-border-custom pt-6">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-secondary flex items-center justify-center font-bold text-white shadow-md text-sm">JD</div>
            <div className="min-w-0">
              <h4 className="font-semibold text-sm truncate">John Doe</h4>
              <p className="text-xs text-slate-500 truncate">john@example.com</p>
            </div>
          </div>
          <a href="/auth" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-rose-500/10 border border-transparent text-slate-500 hover:text-rose-400 transition-all text-sm">
            <span className="text-base">🚪</span> Logout
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-10 p-6 md:p-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-slide-up">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">Transactions</h1>
            <p className="text-slate-400 text-sm mt-1">Review, filter, and track all your financial logs.</p>
          </div>
          <div className="flex gap-3">
            <input
            value = {searchbar}
            onChange={(e) => setSearchbar(e.target.value)}
              type="text"
              placeholder="Search description, category..."
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-border-custom text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-primary transition-all w-60"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-[0_8px_25px_rgba(99,102,241,0.3)] text-white text-sm font-semibold transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
            >
              + New Record
            </button>
          </div>
        </header>

        {/* Filter Toolbar */}
        <section className="flex gap-3 mb-6 overflow-x-auto pb-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <button
            onClick={() => { setTypeFilter("all"); setSearchbar(""); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${ typeFilter === "all" ? "bg-white/10 border border-white/15 text-white" : "bg-white/5 border border-transparent text-slate-400 hover:bg-white/10 hover:text-white" }`}>
            All Records
          </button>
          <button
            onClick={() => setTypeFilter("income")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${ typeFilter === "income" ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400" : "bg-white/5 border border-transparent text-slate-400 hover:bg-white/10 hover:text-white" }`}>
            Income
          </button>
          <button
            onClick={() => setTypeFilter("expense")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${ typeFilter === "expense" ? "bg-rose-500/20 border border-rose-500/30 text-rose-400" : "bg-white/5 border border-transparent text-slate-400 hover:bg-white/10 hover:text-white" }`}>
            Expenses
          </button>
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-transparent hover:bg-white/10 text-slate-400 hover:text-white text-xs font-semibold transition-all">Subscriptions</button>
        </section>

        {/* Transactions Table/Cards list */}
        <div className="bg-surface/40 backdrop-blur-md border border-border-custom rounded-2xl overflow-hidden animate-card-entrance" style={{ animationDelay: '200ms' }}>
          <div className="p-6 border-b border-border-custom flex justify-between items-center">
            <h3 className="font-bold text-lg text-white">History Log</h3>
            <span className="text-xs text-slate-500 bg-white/5 px-2.5 py-1 rounded-md border border-border-custom">Showing 5 entries</span>
          </div>

          <div className="flex flex-col gap-3 p-6">
            {filtered_transactions.map((tx, index) => {
              // Format date string to local: YYYY-MM-DD HH:MM
              let formattedTime = "";
              try {
                if (tx.time) {
                  const timeString = tx.time.endsWith('Z') || tx.time.includes('+')
                    ? tx.time
                    : tx.time + 'Z';
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
                  key={tx.id}
                  className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 ${tx.is_income
                    ? 'tx-card-income bg-emerald-500/[0.04] border-emerald-500/15 hover:bg-emerald-500/[0.08] hover:shadow-emerald-500/10'
                    : 'tx-card-expense bg-rose-500/[0.04] border-rose-500/15 hover:bg-rose-500/[0.08] hover:shadow-rose-500/10'
                    }`}
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${tx.is_income ? 'bg-emerald-500/10' : 'bg-rose-500/10'
                      }`}>
                      {({ Food: '🍔', Shopping: '🛍️', Entertainment: '🎬', Utilities: '⚡', Travel: '✈️', Salary: '💼', Bonus: '🎁', Other: '📌' })[tx.category] || '💸'}
                    </span>
                    <div className="min-w-0 flex-1 md:flex md:items-center md:justify-between md:gap-8">
                      <div>
                        <h4 className="font-semibold text-sm text-white truncate">{tx.category}</h4>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{tx.description || 'No description'}</p>
                      </div>
                      <div className="text-left md:text-right mt-1 md:mt-0">
                        <p className="text-xs text-slate-400">{formattedTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-white/5 pt-3 md:pt-0 shrink-0">
                    <p className={`font-bold text-base tabular-nums ${tx.is_income ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {tx.is_income ? '+' : '−'} ₹{tx.amount?.toLocaleString('en-IN')}
                    </p>
                    <button
                      onClick={ (e) => {deleteTransaction(tx.id)} }
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
        </div>
      </main>

      {/* ── Transaction Add Popup Modal (Pure UI) ── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-surface border border-border-custom rounded-2xl w-full max-w-lg overflow-hidden relative shadow-2xl animate-scale-in">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-secondary to-accent" />

            {/* Header */}
            <div className="p-6 border-b border-border-custom flex justify-between items-center">
              <h3 className="font-extrabold text-lg text-white">Create New Record</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/5 border border-border-custom hover:bg-white/10 transition-colors flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <div className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Type</label>
                  <select 
                    value={isIncome ? "income" : "expense"}
                    onChange={(e) => {
                      if (e.target.value === "income") {
                        setIsIncome(true);
                        setCategory("Salary");
                      } else {
                        setIsIncome(false);
                        setCategory("Food");
                      }
                    }}
                    className="w-full bg-white/5 border border-border-custom rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-primary transition-all cursor-pointer"
                  >
                    <option value="expense" className="bg-slate-900 text-slate-100">Expense</option>
                    <option value="income" className="bg-slate-900 text-slate-100">Income</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white/5 border border-border-custom rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-primary transition-all cursor-pointer"
                  >
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
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">₹</span>
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-white/5 border border-border-custom rounded-xl pl-8 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Description</label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  placeholder="e.g. Weekly grocery shopping"
                  className="w-full bg-white/5 border border-border-custom rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-primary transition-all"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-border-custom hover:bg-white/10 text-sm font-semibold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={createTransaction}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-[0_8px_25px_rgba(99,102,241,0.3)] text-white text-sm font-semibold transition-all cursor-pointer"
                >
                  Save Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;
