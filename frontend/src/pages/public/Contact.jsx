import { useState } from 'react';
import { Mail, Phone, User, Send, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await api.post('/auth/contact', formData);
      setStatus({ type: 'success', message: "Thanks for reaching out! I'll get back to you soon." });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
        <Mail className="w-8 h-8 text-indigo-600" />
        <h1 className="text-4xl font-black text-slate-900">Contact Developer</h1>
      </div>

      <div className="bg-white rounded-[2rem] p-10 shadow-xl border border-slate-200 mt-12 overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px] pointer-events-none -z-10 group-hover:bg-indigo-100 transition-colors duration-700"></div>

        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          {/* Contact Details */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Get in Touch</h2>
            <p className="text-slate-600 mb-8 font-medium leading-relaxed">
              Have a question about NidhiPay or want to completely rethink the digital banking experience? I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group/item">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0 group-hover/item:-translate-y-1 group-hover/item:shadow-md transition-all">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Name</p>
                  <p className="text-lg font-bold text-slate-900">Bharath Basineni</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group/item">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 group-hover/item:-translate-y-1 group-hover/item:shadow-md transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Email</p>
                  <a href="mailto:bharathbasineni1@gmail.com" className="text-lg font-bold text-emerald-600 hover:text-emerald-700 transition-colors">bharathbasineni1@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4 group/item">
                <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center shrink-0 group-hover/item:-translate-y-1 group-hover/item:shadow-md transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Phone</p>
                  <a href="tel:+917989018623" className="text-lg font-bold text-rose-600 hover:text-rose-700 transition-colors">+91 79890 18623</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group/item">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0 group-hover/item:-translate-y-1 group-hover/item:shadow-md transition-all">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Location</p>
                  <p className="text-lg font-bold text-slate-900">India</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action / Form */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Send a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {status.message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                  {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                  <p className="font-medium text-sm">{status.message}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Your Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-shadow" placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Your Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-shadow" placeholder="john@example.com" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Message</label>
                <textarea rows="4" name="message" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-shadow resize-none" placeholder="How can I help you?" required></textarea>
              </div>
              <button disabled={loading} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5 transition-all">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />} 
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
