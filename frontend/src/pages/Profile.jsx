import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { User, Mail, Shield, Wallet, CreditCard, Calendar, Lock, History, AlertTriangle, Activity, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);
  const [accountNumber, setAccountNumber] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isUpdatingPin, setIsUpdatingPin] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const [editData, setEditData] = useState({ name: user?.name || '', email: user?.email || '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [pinData, setPinData] = useState({ currentPin: '', newPin: '' });

  const [securityLogs, setSecurityLogs] = useState([]);
  const [loginActivity, setLoginActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accRes, secRes, logRes] = await Promise.all([
          api.get('/account/balance'),
          api.get('/users/security-logs'),
          api.get('/users/login-activity')
        ]);
        setBalance(accRes.data.balance);
        setAccountNumber(accRes.data.accountNumber);
        setSecurityLogs(secRes.data);
        setLoginActivity(logRes.data);
      } catch (err) {
        console.error('Failed to fetch data', err);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setEditData({ name: user.name, email: user.email });
    }
  }, [user]);

  if (!user) return null;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    try {
      const { data } = await api.put('/users/update-profile', editData);
      localStorage.setItem('user', JSON.stringify(data));
      window.location.reload(); 
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Update failed' });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    try {
      await api.post('/users/reset-password', passwordData);
      setStatus({ type: 'success', message: 'Password updated successfully' });
      setIsResetting(false);
      setPasswordData({ currentPassword: '', newPassword: '' });
      
      // refresh logs
      const secRes = await api.get('/users/security-logs');
      setSecurityLogs(secRes.data);
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Password reset failed' });
    }
  };

  const handleUpdatePin = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    if (pinData.newPin.length !== 4) return setStatus({ type: 'error', message: 'PIN must be exactly 4 digits' });
    try {
      await api.post('/users/update-pin', pinData);
      setStatus({ type: 'success', message: 'Security PIN updated successfully' });
      setIsUpdatingPin(false);
      setPinData({ currentPin: '', newPin: '' });
      
      // refresh logs
      const secRes = await api.get('/users/security-logs');
      setSecurityLogs(secRes.data);
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'PIN update failed' });
    }
  };
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center">
        <User className="w-8 h-8 mr-3 text-blue-600" />
        My Profile
      </h2>

      {status.message && (
        <div className={`p-4 rounded-xl text-sm font-semibold border ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
          {status.message}
        </div>
      )}

      {/* Basic Info Section */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-4xl text-white font-bold shadow-xl shadow-blue-500/30 shrink-0">
          {user.name.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-1 space-y-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4" /> Full Name
              </label>
              <p className="text-lg font-semibold text-slate-800">{user.name}</p>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <p className="text-lg font-semibold text-slate-800">{user.email}</p>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4" /> Account Role
              </label>
              <p className="text-lg font-semibold text-slate-800 capitalize">
                <span className={`px-3 py-1 rounded-full text-sm font-bold border inline-block mt-1 ${
                  user.role === 'admin' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                }`}>
                  {user.role}
                </span>
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Account Number
              </label>
              <p className="text-lg font-bold tracking-widest text-slate-800">{accountNumber || 'Pending'}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Wallet className="w-4 h-4" /> Current Balance
              </label>
              <p className="text-2xl font-bold text-emerald-600">${balance.toLocaleString()}</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Member Since
              </label>
              <p className="text-lg font-semibold text-slate-800">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
              </p>
            </div>
          </div>
          
          <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4">
            <button onClick={() => {setIsEditing(!isEditing); setIsResetting(false); setIsUpdatingPin(false); setStatus({type:'', message:''})}} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
            <Link to="/transactions" className="px-6 py-3 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition-colors flex items-center">
              <History className="w-4 h-4 mr-2" /> View Activity
            </Link>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 animate-in fade-in slide-in-from-top-4">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Edit Profile Information</h3>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
              <input type="text" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <input type="email" value={editData.email} onChange={e => setEditData({...editData, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
            </div>
            <button type="submit" className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-600/20">Save Changes</button>
          </form>
        </div>
      )}

      {/* Security Settings & Logs */}
      <h2 className="text-2xl font-bold text-slate-800 flex items-center mt-12 mb-6">
        <Shield className="w-8 h-8 mr-3 text-indigo-600" />
        Security Settings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col gap-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center"><Lock className="w-5 h-5 mr-2 text-slate-500" /> Actions</h3>
          
          <button onClick={() => {setIsResetting(!isResetting); setIsEditing(false); setIsUpdatingPin(false); setStatus({type:'', message:''})}} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-colors flex justify-between items-center">
            Change Password {isResetting ? '-' : '+'}
          </button>
          
          {isResetting && (
            <div className="animate-in fade-in slide-in-from-top-4 p-4 border rounded-xl bg-slate-50/50">
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                  <input type="password" value={passwordData.currentPassword} onChange={e => setPasswordData({...passwordData, currentPassword: e.target.value})} required className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                  <input type="password" value={passwordData.newPassword} onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})} required className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
                </div>
                <button type="submit" className="w-full px-6 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-colors shadow-sm">Update Password</button>
              </form>
            </div>
          )}

          <button onClick={() => {setIsUpdatingPin(!isUpdatingPin); setIsEditing(false); setIsResetting(false); setStatus({type:'', message:''})}} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-colors flex justify-between items-center">
            Update Security PIN {isUpdatingPin ? '-' : '+'}
          </button>

          {isUpdatingPin && (
            <div className="animate-in fade-in slide-in-from-top-4 p-4 border rounded-xl bg-slate-50/50">
              <form onSubmit={handleUpdatePin} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Current 4-Digit PIN</label>
                  <input type="password" maxLength="4" pattern="\d{4}" value={pinData.currentPin} onChange={e => setPinData({...pinData, currentPin: e.target.value})} required className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all tracking-[0.5em]" placeholder="••••" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">New 4-Digit PIN</label>
                  <input type="password" maxLength="4" pattern="\d{4}" value={pinData.newPin} onChange={e => setPinData({...pinData, newPin: e.target.value})} required className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all tracking-[0.5em]" placeholder="••••" />
                </div>
                <button type="submit" className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center"><Lock className="w-4 h-4 mr-2" /> Save New PIN</button>
              </form>
            </div>
          )}        </div>

        {/* Security Logs Display */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col h-[500px]">
          <h3 className="text-lg font-bold text-slate-800 flex items-center mb-6"><AlertTriangle className="w-5 h-5 mr-2 text-amber-500" /> Security Log & Alerts</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 hidden-scrollbar relative">
            {securityLogs.length === 0 && <p className="text-sm text-slate-500">No security events found.</p>}
            {securityLogs.map(log => (
              <div key={log._id} className="p-3 border rounded-xl text-sm flex gap-3 items-center">
                <div className={`w-2 h-2 rounded-full shrink-0 ${log.status === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">{log.eventType}</p>
                  <p className="text-xs text-slate-500">{new Date(log.timestamp).toLocaleString()} • {log.ipAddress}</p>
                </div>
                {log.status !== 'success' && <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded">Failed</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Device Login History Display */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col h-[500px] md:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 flex items-center mb-6"><Smartphone className="w-5 h-5 mr-2 text-indigo-500" /> Recent Login Activity / Devices</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 hidden-scrollbar relative">
            {loginActivity.length === 0 && <p className="text-sm text-slate-500">No recent logins.</p>}
            {loginActivity.map(act => (
              <div key={act._id} className="p-4 border rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${act.status === 'success' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'}`}>
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">IP: {act.ipAddress}</p>
                    <p className="text-xs text-slate-500">{new Date(act.loginTime).toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${act.status === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                    {act.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
