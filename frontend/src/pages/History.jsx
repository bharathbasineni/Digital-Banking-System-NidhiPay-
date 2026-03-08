import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Download, Filter, Search, History as HistoryIcon, ArrowDownLeft, ArrowUpRight, ArrowRightLeft } from 'lucide-react';

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await api.get('/account/transactions');
        setTransactions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const getTransactionIcon = (type) => {
    if (type === 'deposit') return <ArrowDownLeft className="w-5 h-5 text-emerald-600" />;
    if (type === 'withdraw') return <ArrowUpRight className="w-5 h-5 text-rose-600" />;
    return <ArrowRightLeft className="w-5 h-5 text-blue-600" />;
  };

  const getTransactionColor = (type, tx) => {
    if (type === 'deposit') return 'bg-emerald-50 text-emerald-700 font-bold';
    if (type === 'withdraw') return 'bg-rose-50 text-rose-700 font-bold';
    if (type === 'transfer') {
      return tx.receiverId?._id === user?._id 
        ? 'bg-emerald-50 text-emerald-700 font-bold' 
        : 'bg-slate-100 text-slate-800 font-bold';
    }
    return 'bg-slate-50 text-slate-700 font-bold';
  };

  const formatAmount = (tx) => {
    const isPositive = tx.type === 'deposit' || (tx.type === 'transfer' && tx.receiverId?._id === user?._id);
    return `${isPositive ? '+' : '-'}$${tx.amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center">
            <HistoryIcon className="w-8 h-8 mr-3 text-blue-600" />
            Transaction History
          </h2>
          <p className="text-slate-500 mt-2 font-medium">View and track all your recent financial activities.</p>
        </div>
        
        <div className="flex space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-12 pr-4 py-3 bg-white text-slate-900 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm font-medium"
            />
          </div>
          <button className="px-5 py-3 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm flex items-center">
            <Filter className="w-5 h-5 mr-2" /> Filter
          </button>
          <button className="px-5 py-3 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm flex items-center">
            <Download className="w-5 h-5 mr-2" /> Export
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/80 dark:bg-slate-900/50 backdrop-blur-md border-b border-slate-100 dark:border-slate-700">
              <tr>
                <th className="px-8 py-5 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Transaction Info</th>
                <th className="px-8 py-5 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date & Time</th>
                <th className="px-8 py-5 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Reference ID</th>
                <th className="px-8 py-5 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="px-8 py-5 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider rounded-tr-2xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-16 text-center text-slate-500 font-medium">
                    <span className="flex items-center justify-center space-x-3 text-blue-600 font-bold text-lg"><span className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></span><span>Loading transactions...</span></span>
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-16 text-center text-slate-500 font-medium">No transactions found.</td>
                </tr>
              ) : (
transactions.map((tx) => (
                  <tr key={tx._id} className="hover:bg-blue-50/30 dark:hover:bg-slate-700/50 transition-colors group">
                    <td className="px-8 py-5 border-b border-slate-50 dark:border-slate-700/50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                          {getTransactionIcon(tx.type)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white capitalize">{tx.type} {(tx.type === 'transfer' && tx.receiverId) ? (
                            <span className="text-slate-500 dark:text-slate-400 text-sm ml-2 font-medium">
                              {tx.receiverId._id === user?._id ? `from ${tx.receiverId.name}` : `to ${tx.receiverId.name}`}
                            </span>
                          ) : ''}</p>
                          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{tx.description || 'System transaction'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 border-b border-slate-50 dark:border-slate-700/50">
                      <p className="font-bold text-slate-900 dark:text-white">{new Date(tx.createdAt).toLocaleDateString()}</p>
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{new Date(tx.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    </td>
                    <td className="px-8 py-5 border-b border-slate-50 dark:border-slate-700/50">
                      <span className="font-mono bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-xl text-sm font-bold tracking-wider">{tx.reference}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-4 py-2 rounded-xl border border-transparent flex items-center w-fit ${getTransactionColor(tx.type, tx)}`}>
                        {formatAmount(tx)}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-4 py-2 rounded-xl text-sm font-bold border flex items-center w-fit ${
                        tx.status === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 shadow-sm shadow-emerald-50' : 
                        tx.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100 shadow-sm shadow-amber-50' : 
                        'bg-rose-50 text-rose-700 border-rose-100 shadow-sm shadow-rose-50'
                      }`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${tx.status === 'success' ? 'bg-emerald-500' : tx.status === 'pending' ? 'bg-amber-500' : 'bg-rose-500'}`}></span>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination placeholder */}
        <div className="px-8 py-5 flex items-center justify-between border-t border-slate-100 bg-slate-50/50">
          <p className="text-sm font-bold text-slate-500">Showing <span className="text-slate-900">{transactions.length}</span> results</p>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-400 cursor-not-allowed">Previous</button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 shadow-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
