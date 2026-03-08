import { useState } from 'react';
import api from '../services/api';
import { Send, AlertTriangle, CheckCircle2 } from 'lucide-react';

const Transfer = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  // Fraud detection threshold
  const SUSPICIOUS_THRESHOLD = 10000;

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!accountNumber || !amount || !pin) return;
    if (showOtpInput && !otp) return;

    if (Number(amount) > SUSPICIOUS_THRESHOLD && !showOtpInput) {
      if (!window.confirm('Warning: Large transaction detected. Are you sure you want to proceed?')) {
        return;
      }
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await api.post('/account/transfer', {
        accountNumber,
        amount: Number(amount),
        pin,
        otp: showOtpInput ? otp : undefined
      });
      
      if (res.status === 202 && res.data.requiresOTP) {
        setShowOtpInput(true);
        setStatus({ type: 'success', message: res.data.message });
      } else {
        setStatus({ type: 'success', message: 'Transfer successful!' });
        setAccountNumber('');
        setAmount('');
        setPin('');
        setOtp('');
        setShowOtpInput(false);
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Transfer failed' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-50"></div>

        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-6 shadow-inner shadow-blue-100">
            <Send className="w-8 h-8 rotate-6" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Transfer Funds</h2>
          <p className="text-slate-500 mt-2 font-medium">Send money securely to anyone, anywhere.</p>
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

        <form onSubmit={handleTransfer} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Recipient Account Number</label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-5 py-4 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-2xl border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium tracking-widest"
                placeholder="0000000000"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Amount ($)</label>
            <div className="relative group">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-blue-500 transition-colors pointer-events-none">$</span>
              <input
                type="number"
                min="1"
                step="0.01"
                className="w-full pl-10 pr-5 py-4 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold text-lg"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            {Number(amount) > SUSPICIOUS_THRESHOLD && (
              <p className="text-amber-600 text-xs mt-3 flex items-center font-semibold bg-amber-50 px-3 py-2 rounded-xl border border-amber-100 inline-flex">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Large transfer detected. Needs confirmation.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Security PIN</label>
            <div className="relative">
              <input
                type="password"
                maxLength="4"
                pattern="\d{4}"
                className="w-full px-5 py-4 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-2xl border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium tracking-[0.5em]"
                placeholder="••••"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
              />
            </div>
          </div>

          {showOtpInput && (
            <div className="animate-in fade-in slide-in-from-top-4">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Email OTP</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-5 py-4 bg-amber-50 dark:bg-slate-800 text-amber-900 dark:text-white placeholder:text-amber-400 rounded-2xl border border-amber-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all font-bold tracking-widest text-center"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-amber-600 mt-2 font-medium">Please enter the 6-digit code sent to your email to verify this large transfer.</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] transition-all shadow-xl shadow-blue-600/20 disabled:opacity-70 disabled:active:scale-100 mt-8 flex justify-center items-center group"
          >
            {loading ? 'Processing Transfer...' : (
              <>
                <span className="mr-2 hidden group-hover:inline-block transition-all"><Send className="w-5 h-5 animate-pulse" /></span> Send Money Securely
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transfer;
