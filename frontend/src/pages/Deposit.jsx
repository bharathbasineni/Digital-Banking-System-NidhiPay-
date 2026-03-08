import { useState } from 'react';
import api from '../services/api';
import { ArrowDownLeft, AlertTriangle, CheckCircle2 } from 'lucide-react';

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleDeposit = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await api.post('/account/deposit', {
        amount: Number(amount)
      });
      setStatus({ type: 'success', message: `Successfully deposited $${response.data.transaction.amount}. New Balance: $${response.data.balance}` });
      setAmount('');
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Deposit failed' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-50"></div>

        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-6 shadow-inner shadow-emerald-100">
            <ArrowDownLeft className="w-8 h-8 rotate-6" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Deposit Funds</h2>
          <p className="text-slate-500 mt-2 font-medium">Add money to your NidhiPay account quickly.</p>
        </div>

        {status.message && (
          <div className={`p-5 mb-8 rounded-2xl text-sm border flex items-center font-semibold animate-in fade-in slide-in-from-top-4 ${
            status.type === 'success' 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-100 shadow-sm shadow-emerald-100/50' 
            : 'bg-rose-50 text-rose-700 border-rose-100 shadow-sm shadow-rose-100/50'
          }`}>
            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 mr-3 shrink-0" /> : <AlertTriangle className="w-5 h-5 mr-3 shrink-0" />}
            {status.message}
          </div>
        )}

        <form onSubmit={handleDeposit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Amount ($)</label>
            <div className="relative group">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-emerald-500 transition-colors pointer-events-none">$</span>
              <input
                type="number"
                min="1"
                step="0.01"
                className="w-full pl-10 pr-5 py-4 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-lg"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !amount}
            className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-xl shadow-emerald-600/20 disabled:opacity-70 disabled:active:scale-100 mt-8 flex justify-center items-center"
          >
            {loading ? 'Processing...' : 'Complete Deposit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Deposit;
