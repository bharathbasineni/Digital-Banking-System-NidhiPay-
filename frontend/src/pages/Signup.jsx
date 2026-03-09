import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';
import api from '../services/api';
import ReCAPTCHA from "react-google-recaptcha";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    pin: ''
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.pin) {
      return setError('All fields are required');
    }
    if (formData.pin.length !== 4 || !/^\d{4}$/.test(formData.pin)) {
      return setError('Security PIN must be exactly 4 digits');
    }
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await register(formData.name, formData.email, formData.password, formData.pin);
      setSuccess('OTP sent successfully! Redirecting to verification...');
      setTimeout(() => {
        navigate('/verify-otp', { state: { ...formData, demoOtp: res?.demoOtp } });
      }, 1500);
    } catch (err) {
      if (err.message === 'Network Error') {
        setError('Cannot connect to server. Please ensure the backend is running.');
      } else {
        setError(err.response?.data?.message || err.message || 'Registration failed due to an unknown error');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen auth-bg flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-[500px] bg-white rounded-[2rem] p-10 shadow-2xl shadow-indigo-900/10 border border-slate-100 relative overflow-hidden">
        {/* Decorative corner shape */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-50 rounded-tr-[100px] -z-10"></div>

        <div className="mb-10 text-center relative z-10">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3 transition-transform hover:rotate-0">
            <UserPlus className="w-8 h-8 rotate-3" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Create Account</h2>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed">Join thousands of users managing their finances digitally with NidhiPay.</p>
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
            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-5 py-3.5 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-medium"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full px-5 py-3.5 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-medium"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-5 py-3.5 bg-slate-50/50 text-slate-900 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400 font-medium"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-5 py-3.5 bg-slate-50/50 text-slate-900 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400 font-medium"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">4-Digit Security PIN</label>
            <input
              type="password"
              name="pin"
              maxLength="4"
              pattern="\d{4}"
              className="w-full px-5 py-3.5 bg-slate-50/50 text-slate-900 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400 font-medium tracking-[0.5em]"
              placeholder="••••"
              value={formData.pin}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-slate-500 mt-2 font-medium">This PIN is required for all fund transfers.</p>
          </div>

          <div className="flex justify-center mt-6">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !captchaToken}
            className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-70 mt-8 flex justify-center items-center group overflow-hidden relative"
          >
            <span className="relative z-10">{loading ? 'Creating Account...' : 'Sign Up Securely'}</span>
            <div className="absolute inset-0 h-full w-full bg-indigo-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-2xl -z-0 duration-300"></div>
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm font-medium relative z-10">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline underline-offset-4 transition-all">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
