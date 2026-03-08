import { LayoutGrid, LayoutDashboard, History, Send, Shield } from 'lucide-react';

const Modules = () => {
  const modules = [
    {
      icon: LayoutDashboard,
      title: 'Banking Dashboard',
      desc: 'Real-time aggregate view of balances, recent activity, and financial charting representing cash flow.',
      color: 'blue'
    },
    {
      icon: History,
      title: 'Transaction History',
      desc: 'Detailed chronologic ledger of all deposits, withdrawals, and account-to-account transfers.',
      color: 'emerald'
    },
    {
      icon: Send,
      title: 'Fund Transfers',
      desc: 'Securely execute peer-to-peer balance routing utilizing unique generated account strings and mandatory PINs.',
      color: 'amber'
    },
    {
      icon: Shield,
      title: 'Security Profile',
      desc: 'A dedicated interface highlighting active session IP tracking, fail-logs, and 2FA authentication state toggles.',
      color: 'rose'
    }
  ];

  const colorVariants = {
    blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    emerald: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
    amber: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
    rose: 'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white',
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
        <LayoutGrid className="w-8 h-8 text-indigo-600" />
        <h1 className="text-4xl font-black text-slate-900">Application Modules</h1>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {modules.map((module, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 group">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-300 ${colorVariants[module.color]}`}>
              <module.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{module.title}</h3>
            <p className="text-slate-600 font-medium text-lg leading-relaxed">{module.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modules;
