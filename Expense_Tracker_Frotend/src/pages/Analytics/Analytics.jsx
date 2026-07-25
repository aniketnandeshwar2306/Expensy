import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

function Analytics() {
  const chartData = [
    { name: 'Mon', income: 4000, expense: 2400 },
    { name: 'Tue', income: 3000, expense: 1398 },
    { name: 'Wed', income: 9800, expense: 5000 },
    { name: 'Thu', income: 3908, expense: 2780 },
    { name: 'Fri', income: 4800, expense: 1890 },
    { name: 'Sat', income: 3800, expense: 2390 },
    { name: 'Sun', income: 4300, expense: 3490 },
  ];

  const categoryShare = [
    { name: 'Food & Dining', value: 35, color: '#6366f1' },
    { name: 'Shopping', value: 25, color: '#f43f5e' },
    { name: 'Utilities', value: 15, color: '#10b981' },
    { name: 'Entertainment', value: 15, color: '#f59e0b' },
    { name: 'Travel', value: 10, color: '#8b5cf6' }
  ];

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
            <a href="/transactions" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 border border-transparent text-slate-400 hover:text-white transition-all">
              <span className="text-lg">💸</span> Transactions
            </a>
            <a href="/budgets" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 border border-transparent text-slate-400 hover:text-white transition-all">
              <span className="text-lg">🎯</span> Budgets
            </a>
            <a href="/analytics" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 text-white font-medium transition-all">
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
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">Analytics</h1>
            <p className="text-slate-400 text-sm mt-1">Deep insights into cashflow, breakdown, and patterns.</p>
          </div>
          <div className="flex bg-white/5 border border-border-custom rounded-xl p-0.5 text-xs text-slate-400">
            <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium">This Week</button>
            <button className="px-4 py-2 hover:text-white transition-colors">This Month</button>
            <button className="px-4 py-2 hover:text-white transition-colors">This Year</button>
          </div>
        </header>

        {/* Analytics charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-surface/40 backdrop-blur-md border border-border-custom p-6 rounded-2xl flex flex-col h-[380px] animate-card-entrance" style={{ animationDelay: '100ms' }}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-lg text-white">Cashflow Analysis</h3>
                <p className="text-xs text-slate-400">Weekly comparison of cash flow</p>
              </div>
              <div className="flex gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Income</span>
                <span className="flex items-center gap-1.5 text-indigo-400"><span className="w-2 h-2 rounded-full bg-indigo-500" /> Expenses</span>
              </div>
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.08)' }} labelStyle={{ color: '#94a3b8' }} />
                  <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
                  <Area type="monotone" dataKey="expense" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakdown / Right Column card */}
          <div className="bg-surface/40 backdrop-blur-md border border-border-custom p-6 rounded-2xl flex flex-col h-[380px] animate-card-entrance" style={{ animationDelay: '200ms' }}>
            <h3 className="font-bold text-lg text-white mb-1">Expense Breakdown</h3>
            <p className="text-xs text-slate-400 mb-6">Percentage share of each category</p>
            <div className="flex-1 flex flex-col justify-around">
              {categoryShare.map((cat, index) => (
                <div key={index} className="w-full">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-200 mb-1.5">
                    <span>{cat.name}</span>
                    <span className="tabular-nums">{cat.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${cat.value}%`, backgroundColor: cat.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Secondary insights strip */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 animate-card-entrance" style={{ animationDelay: '300ms' }}>
          <div className="bg-white/[0.02] border border-border-custom p-5 rounded-2xl">
            <h4 className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Highest Spent Category</h4>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-white">🍔 Food & Dining</span>
              <span className="text-xs text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">₹14,250</span>
            </div>
          </div>
          <div className="bg-white/[0.02] border border-border-custom p-5 rounded-2xl">
            <h4 className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Savings Rate</h4>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-emerald-400">32.4%</span>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Excellent</span>
            </div>
          </div>
          <div className="bg-white/[0.02] border border-border-custom p-5 rounded-2xl">
            <h4 className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Monthly Average</h4>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-white">₹38,400</span>
              <span className="text-xs text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">Per month</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Analytics;
