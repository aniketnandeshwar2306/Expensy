import React from 'react';

function Budgets() {
  const budgetList = [
    { id: 1, category: '🍔 Food & Dining', spent: 12500, limit: 20000, color: 'bg-primary' },
    { id: 2, category: '🛍️ Shopping', spent: 18400, limit: 15000, color: 'bg-rose-500' },
    { id: 3, category: '🎬 Entertainment', spent: 4800, limit: 8000, color: 'bg-amber-500' },
    { id: 4, category: '⚡ Utilities', spent: 9200, limit: 10000, color: 'bg-emerald-500' },
    { id: 5, category: '✈️ Travel & Commute', spent: 1200, limit: 5000, color: 'bg-cyan-500' }
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
            <a href="/budgets" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 text-white font-medium transition-all">
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
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">Budgets</h1>
            <p className="text-slate-400 text-sm mt-1">Set monthly limits to stay in control of your financial goals.</p>
          </div>
          <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/20 text-white text-sm font-semibold transition-all">
            + Create New Budget
          </button>
        </header>

        {/* Budgets layout */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-card-entrance">
          <div className="flex flex-col gap-6">
            {budgetList.map((item) => {
              const percent = Math.min(100, Math.round((item.spent / item.limit) * 100));
              const isOver = item.spent > item.limit;
              
              return (
                <div key={item.id} className="bg-surface/40 backdrop-blur-md border border-border-custom p-6 rounded-2xl flex flex-col hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-bold text-base text-white">{item.category}</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {isOver ? (
                          <span className="text-rose-400 font-semibold">⚠️ Exceeded by ₹{(item.spent - item.limit).toLocaleString('en-IN')}</span>
                        ) : (
                          <span>₹{(item.limit - item.spent).toLocaleString('en-IN')} remaining</span>
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Usage</span>
                      <span className={`text-sm font-bold ${isOver ? 'text-rose-400' : 'text-slate-200'}`}>{percent}%</span>
                    </div>
                  </div>

                  <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden mb-2">
                    <div className={`h-full rounded-full transition-all duration-1000 ${isOver ? 'bg-rose-500' : item.color}`} style={{ width: `${percent}%` }} />
                  </div>

                  <div className="flex justify-between text-xs text-slate-500 font-medium mt-1">
                    <span>Spent: ₹{item.spent.toLocaleString('en-IN')}</span>
                    <span>Limit: ₹{item.limit.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick recommendations/insights card */}
          <div className="bg-surface/40 backdrop-blur-md border border-border-custom p-8 rounded-2xl flex flex-col justify-between h-[360px]">
            <div>
              <span className="text-3xl mb-4 block">💡</span>
              <h3 className="font-bold text-xl text-white mb-2">Smart Insights</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Based on your last 30 days of expenses, we recommend setting a tighter budget on **Shopping** and allocating an extra 10% to **Savings** to hit your Q3 objective.
              </p>
            </div>
            
            <div className="border-t border-border-custom pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-300">Total Monthly Limit</span>
                <span className="text-lg font-extrabold text-white">₹58,000</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Avg. Daily Allocation</span>
                <span className="font-semibold text-slate-300">₹1,930 / day</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Budgets;
