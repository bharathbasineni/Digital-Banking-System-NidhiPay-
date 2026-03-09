import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import api from '../services/api';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const signupData = location.state;

  useEffect(() => {
    if (!signupData || !signupData.email) {
      navigate('/signup');
    }
  }, [signupData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      return setError('Please enter a valid 6-digit OTP');
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/verify-otp', {
        ...signupData,
        otp
      });
      setSuccess(data.message || 'Account verified successfully!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      if (err.message === 'Network Error') {
        setError('Cannot connect to server. Please ensure the backend is running.');
      } else {
        setError(err.response?.data?.message || err.message || 'Verification failed');
      }
    }
    setLoading(false);
  };

  const handleResend = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await api.post('/auth/register', signupData);
      setSuccess('A new OTP has been sent to your email.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    }
    setLoading(false);
  };

  if (!signupData) return null;

  return (
    <div className="min-h-screen auth-bg flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-[500px] bg-white rounded-[2rem] p-10 shadow-2xl shadow-indigo-900/10 border border-slate-100 relative overflow-hidden">
        {/* Decorative corner shape */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-50 rounded-tr-[100px] -z-10"></div>

        <div className="mb-10 text-center relative z-10">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3 transition-transform hover:rotate-0">
            <ShieldCheck className="w-8 h-8 rotate-3" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Verify Your Email</h2>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed">
            We've sent a 6-digit code to <br/><strong className="text-slate-700">{signupData.email}</strong>. Please enter it below to complete signup.
          </p>
        </div>

        {error && (
          <div className="p-4 mb-6 bg-red-50/80 backdrop-blur-sm text-red-600 rounded-2xl text-sm border border-red-100 flex items-center font-medium shadow-sm animate-pulse-once">
            <span className="mr-2">⚠️</span> {error}
          </div>
        )}

        {success && (
          <div className="p-4 mb-6 bg-emerald-50/80 backdrop-blur-sm text-emerald-600 rounded-2xl text-sm border border-emerald-100 flex items-center font-medium shadow-sm">
            <span className="mr-2">✅</span> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 text-center">6-Digit OTP</label>
            <input
              type="text"
              maxLength="6"
              className="w-full px-5 py-4 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-center text-2xl font-bold tracking-[0.5em]"
              placeholder="••••••"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-70 mt-8 flex justify-center items-center group overflow-hidden relative"
          >
            <span className="relative z-10">{loading ? 'Verifying...' : 'Verify & Create Account'}</span>
            <div className="absolute inset-0 h-full w-full bg-indigo-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-2xl -z-0 duration-300"></div>
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm font-medium relative z-10">
          Didn't receive the code?{' '}
          <button onClick={handleResend} disabled={loading} className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline underline-offset-4 transition-all disabled:opacity-50">
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;
