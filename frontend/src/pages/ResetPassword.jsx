import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import api from '../services/api';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      return setError('All fields are required');
    }
    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    setError('');
    setMessage('');
    setLoading(true);
    
    try {
      const res = await api.post('/auth/reset-password', { token, newPassword });
      setMessage(res.data.message || 'Password reset successfully.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      if (err.message === 'Network Error') {
        setError('Cannot connect to server. Please ensure the backend is running.');
      } else {
        setError(err.response?.data?.message || err.message || 'Failed to reset password.');
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen auth-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[2rem] p-10 shadow-2xl shadow-blue-900/10 border border-slate-100">
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
            <LogIn className="w-8 h-8 -rotate-3" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Reset Password</h2>
          <p className="text-slate-500">Enter your new password below</p>
        </div>

        {error && (
          <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-center font-medium">
            {error}
          </div>
        )}
        
        {message && (
          <div className="p-4 mb-6 bg-green-50 text-green-600 rounded-xl text-sm border border-green-100 flex items-center font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-5 py-4 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-5 py-4 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:active:scale-100 mt-8"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-600 text-sm">
          Return to{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
