import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { Wallet, ArrowUpRight, ArrowDownLeft, Loader2, History, Filter } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('1month');

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [balanceRes, txRes] = await Promise.all([
        api.get('/account/balance'),
        api.get(`/account/transactions?range=${filter}`)
      ]);
      setBalance(balanceRes.data.balance);
      setTransactions(txRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [filter]);

  // Transform transactions into chart data
  const processChartData = () => {
    // Reverse to get chronological order
    const chronos = [...transactions].reverse();
    const labels = chronos.map(tx => new Date(tx.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
    
    const deposits = chronos.map(tx => (tx.type === 'deposit' || (tx.type === 'transfer' && tx.receiverId?._id === user?._id)) ? tx.amount : 0);
    const withdrawals = chronos.map(tx => (tx.type === 'withdraw' || (tx.type === 'transfer' && tx.userId === user?._id)) ? tx.amount : 0);

    return {
      labels: labels.length ? labels : ['No Data'],
      datasets: [
        {
          label: 'Incoming (Deposits)',
          data: deposits.length ? deposits : [0],
          borderColor: 'rgb(16, 185, 129)', // emerald-500
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Outgoing (Withdrawals/Transfers)',
          data: withdrawals.length ? withdrawals : [0],
          borderColor: 'rgb(244, 63, 94)', // rose-500
          backgroundColor: 'rgba(244, 63, 94, 0.1)',
          fill: true,
          tension: 0.4,
        }
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#64748b' } },
    },
    scales: {
      y: { grid: { color: 'rgba(148, 163, 184, 0.1)' }, ticks: { color: '#94a3b8' } },
      x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
    }
  };

  const handleQuickAction = (type) => {
    navigate(`/${type}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[2rem] p-8 text-white relative overflow-hidden flex-1 shadow-2xl shadow-blue-900/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-blue-100 font-medium tracking-wide mb-1 text-sm uppercase">Total Balance</p>
                {loading ? (
                  <Loader2 className="w-8 h-8 animate-spin text-white mb-2" />
                ) : (
                  <h2 className="text-4xl font-bold tracking-tight">${balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
                )}
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                <Wallet className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex space-x-6 text-sm font-medium">
              <div className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20">
                Active Account
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex-1 grid grid-cols-3 gap-4">
          <button onClick={() => handleQuickAction('deposit')} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col items-center justify-center text-slate-700 dark:text-slate-200">
            <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ArrowDownLeft className="w-7 h-7" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">Deposit</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Add money</span>
          </button>

          <button onClick={() => handleQuickAction('withdraw')} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col items-center justify-center text-slate-700 dark:text-slate-200">
            <div className="w-14 h-14 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ArrowUpRight className="w-7 h-7" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">Withdraw</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Cash out</span>
          </button>

          <button onClick={() => handleQuickAction('transfer')} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col items-center justify-center text-slate-700 dark:text-slate-200">
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ArrowUpRight className="w-7 h-7 -rotate-45" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">Transfer</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Send funds</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Financial Analytics</h3>
          </div>
          <div className="h-72 w-full">
            <Line data={processChartData()} options={chartOptions} />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Transactions</h3>
            <div className="relative group">
              <button className="flex items-center text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 border px-3 py-1.5 rounded-lg dark:border-slate-700">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 overflow-hidden">
                <button onClick={() => setFilter('1week')} className={`block w-full text-left px-4 py-2 text-sm ${filter === '1week' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>Past 1 Week</button>
                <button onClick={() => setFilter('1month')} className={`block w-full text-left px-4 py-2 text-sm ${filter === '1month' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>Past 1 Month</button>
                <button onClick={() => setFilter('6months')} className={`block w-full text-left px-4 py-2 text-sm ${filter === '6months' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>Past 6 Months</button>
                <button onClick={() => setFilter('1year')} className={`block w-full text-left px-4 py-2 text-sm ${filter === '1year' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>Past 1 Year</button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 overflow-y-auto pr-2 flex-1" style={{maxHeight: '300px'}}>
            {loading ? (
              <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
            ) : transactions.length > 0 ? transactions.map((tx) => (
              <div key={tx._id} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    tx.type === 'deposit' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                    tx.type === 'withdraw' ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' :
                    'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  }`}>
                    {tx.type === 'deposit' ? <ArrowDownLeft className="w-5 h-5" /> : 
                     tx.type === 'withdraw' ? <ArrowUpRight className="w-5 h-5" /> :
                     <ArrowUpRight className="w-5 h-5 -rotate-45" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 capitalize">{tx.type}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{new Date(tx.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className={`font-bold tracking-tight ${tx.type === 'deposit' || (tx.type === 'transfer' && tx.receiverId?._id === user?._id) ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                  {tx.type === 'deposit' ? '+' : '-'}${tx.amount.toLocaleString()}
                </div>
              </div>
            )) : (
              <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 border-dashed">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                  <History className="w-6 h-6" />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">No transactions found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
