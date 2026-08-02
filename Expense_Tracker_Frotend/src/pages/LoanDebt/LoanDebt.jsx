import React from 'react';

function LoanDebt() {
  const activeDebts = [
    { id: 1, name: 'HDFC Home Loan', principal: 2500000, paid: 850000, interestRate: 8.5, nextEMI: '15,500', dueDate: '05 Aug 2026' },
    { id: 2, name: 'ICICI Car Loan', principal: 800000, paid: 600000, interestRate: 9.25, nextEMI: '12,400', dueDate: '10 Aug 2026' },
    { id: 3, name: 'Education Loan', principal: 1200000, paid: 150000, interestRate: 6.8, nextEMI: '9,800', dueDate: '15 Aug 2026' }
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
            <a href="/analytics" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 border border-transparent text-slate-400 hover:text-white transition-all">
              <span className="text-lg">📈</span> Analytics
            </a>
            <a href="/loans" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 text-white font-medium transition-all">
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
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 animate-slide-up">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">Loans & Debts</h1>
            <p className="text-slate-400 text-sm mt-1">Track principal outstanding, interests, and EMIs payoff journey.</p>
          </div>
          <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/20 text-white text-sm font-semibold transition-all">
            + Add Loan Account
          </button>
        </header>

        {/* Coming Soon Alert Banner */}
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 px-4 py-3 rounded-xl mb-8 flex items-center justify-between text-sm font-medium animate-slide-down">
          <div className="flex items-center gap-2">
            <span>🚀</span>
            <span><strong>Coming Soon:</strong> EMI payoff calculator & loan management are coming soon. Below is a preview of the feature.</span>
          </div>
          <span className="text-xs bg-amber-500/20 text-amber-200 px-2.5 py-1 rounded-full font-semibold shrink-0">Preview Mode</span>
        </div>

        {/* Overview Row */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="bg-surface/40 backdrop-blur-md border border-border-custom p-6 rounded-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Borrowed</span>
            <h3 className="text-2xl font-extrabold text-white mt-1">₹45,00,000</h3>
          </div>
          <div className="bg-surface/40 backdrop-blur-md border border-border-custom p-6 rounded-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Remaining Balance</span>
            <h3 className="text-2xl font-extrabold text-rose-400 mt-1">₹29,00,000</h3>
          </div>
          <div className="bg-surface/40 backdrop-blur-md border border-border-custom p-6 rounded-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Paid off</span>
            <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">₹16,00,000</h3>
          </div>
        </section>

        {/* Loans Table List */}
        <div className="bg-surface/40 backdrop-blur-md border border-border-custom rounded-2xl overflow-hidden animate-card-entrance" style={{ animationDelay: '200ms' }}>
          <div className="p-6 border-b border-border-custom">
            <h3 className="font-bold text-lg text-white">Active Obligations</h3>
          </div>

          <div className="p-6 flex flex-col gap-6">
            {activeDebts.map((debt) => {
              const paidPercent = Math.round((debt.paid / debt.principal) * 100);
              
              return (
                <div key={debt.id} className="border border-border-custom bg-white/[0.01] hover:bg-white/[0.02] p-5 rounded-xl transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h4 className="font-bold text-base text-white">{debt.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Interest rate: {debt.interestRate}% p.a.</p>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div className="text-left md:text-right">
                        <span className="text-xs text-slate-500 block uppercase tracking-wider">Next EMI</span>
                        <span className="font-bold text-white">₹{debt.nextEMI}</span>
                      </div>
                      <div className="text-left md:text-right">
                        <span className="text-xs text-slate-500 block uppercase tracking-wider">Due Date</span>
                        <span className="font-semibold text-amber-400">{debt.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-3">
                    <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${paidPercent}%` }} />
                  </div>

                  <div className="flex justify-between text-xs text-slate-400 font-medium">
                    <span>Paid: ₹{debt.paid.toLocaleString('en-IN')} ({paidPercent}%)</span>
                    <span>Principal: ₹{debt.principal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoanDebt;
