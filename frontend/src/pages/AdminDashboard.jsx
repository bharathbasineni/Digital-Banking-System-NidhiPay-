import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Users, Activity, AlertTriangle, Ban, CheckCircle2 } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, txRes] = await Promise.all([
          api.get('/admin/users'),
          api.get('/admin/transactions')
        ]);
        setUsers(usersRes.data);
        setTransactions(txRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleToggleBlock = async (userId) => {
    try {
      const { data } = await api.put(`/admin/users/${userId}/block`);
      setUsers(users.map(u => u._id === userId ? { ...u, isBlocked: data.isBlocked } : u));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user status');
    }
  };

  const suspiciousTransactions = transactions.filter(tx => tx.amount > 10000);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Admin Overview</h2>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Users</p>
            <h3 className="text-2xl font-bold text-slate-800">{users.length}</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Transactions</p>
            <h3 className="text-2xl font-bold text-slate-800">{transactions.length}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Alerts</p>
            <h3 className="text-2xl font-bold text-slate-800">{suspiciousTransactions.length}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Suspicious Transactions (&gt;$10,000)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 text-sm font-semibold text-slate-500">User ID</th>
                <th className="pb-3 text-sm font-semibold text-slate-500">Type</th>
                <th className="pb-3 text-sm font-semibold text-slate-500">Amount</th>
                <th className="pb-3 text-sm font-semibold text-slate-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {suspiciousTransactions.length > 0 ? suspiciousTransactions.map(tx => (
                <tr key={tx._id}>
                  <td className="py-4 text-sm text-slate-700">{tx.userId?._id || 'Unknown'}</td>
                  <td className="py-4 text-sm text-slate-700 capitalize">{tx.type}</td>
                  <td className="py-4 text-sm font-semibold text-rose-600">${tx.amount.toLocaleString()}</td>
                  <td className="py-4 text-sm text-slate-500">{new Date(tx.createdAt).toLocaleDateString()}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-slate-500">No suspicious transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">User Management</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 text-sm font-semibold text-slate-500">Name</th>
                <th className="pb-3 text-sm font-semibold text-slate-500">Email</th>
                <th className="pb-3 text-sm font-semibold text-slate-500">Role</th>
                <th className="pb-3 text-sm font-semibold text-slate-500">Status</th>
                <th className="pb-3 text-sm font-semibold text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => (
                <tr key={u._id}>
                  <td className="py-4 text-sm font-semibold text-slate-800">{u.name}</td>
                  <td className="py-4 text-sm text-slate-600">{u.email}</td>
                  <td className="py-4 text-sm text-slate-700 capitalize">{u.role}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border inline-flex items-center ${u.isBlocked ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                      {u.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    {u.role !== 'admin' && (
                      <button
                        onClick={() => handleToggleBlock(u._id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center ml-auto transition-colors ${
                          u.isBlocked 
                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                            : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                        }`}
                      >
                        {u.isBlocked ? (
                          <><CheckCircle2 className="w-4 h-4 mr-1"/> Unblock</>
                        ) : (
                          <><Ban className="w-4 h-4 mr-1"/> Block User</>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
