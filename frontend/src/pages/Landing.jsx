import { Link } from 'react-router-dom';
import {
  ShieldCheck, Send, History, LayoutDashboard,
  Lock, Bell, UserPlus, Fingerprint,
  Coins, ArrowRight, Github
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-['Inter',sans-serif] selection:bg-indigo-100 selection:text-indigo-900 pb-20">

      {/* Navigation */}
      <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm bg-gradient-to-br from-indigo-500 to-indigo-700">
              N
            </div>
            <span className="text-2xl font-black text-slate-800 tracking-tight">
              NidhiPay
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-5 py-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 font-bold rounded-lg transition-colors">
              Login
            </Link>
            <Link to="/signup" className="px-5 py-2 text-white bg-indigo-600 hover:bg-indigo-700 font-bold rounded-lg transition-colors shadow-sm">
              Open Account
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 mt-8 md:mt-16 space-y-24">

        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto relative z-10 pt-8 pb-12 rounded-3xl bg-gradient-to-b from-indigo-50/50 to-transparent border border-white/50 shadow-sm backdrop-blur-sm">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-tr from-indigo-200/40 via-purple-100/40 to-blue-200/40 blur-3xl -z-10 rounded-full"></div>

          <div className="flex justify-center items-center mb-6">
            <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm mb-2">
              <Coins className="w-8 h-8" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
            NidhiPay — Secure Digital <br className="hidden md:block" /> Banking Platform
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed font-medium max-w-3xl mx-auto px-4">
            NidhiPay is a modern digital banking platform that allows users to securely manage accounts, transfer funds instantly, and track transactions in real time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center text-lg shadow-md shadow-indigo-600/20">
              Open Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-800 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 hover:-translate-y-0.5 transition-all flex items-center justify-center text-lg shadow-sm">
              <Github className="mr-2 w-5 h-5" /> View GitHub
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Powerful Fintech Features</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">Everything you need to manage your personal finances securely and efficiently.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Secure Authentication", desc: "JWT + 2FA ensuring your account access is always protected.", color: "text-emerald-600", bg: "bg-emerald-50" },
              { icon: Send, title: "Instant Fund Transfer", desc: "Move money seamlessly between accounts with zero delays.", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: History, title: "Transaction History Tracking", desc: "Granular details of every deposit, withdrawal, and transfer.", color: "text-indigo-600", bg: "bg-indigo-50" },
              { icon: LayoutDashboard, title: "Account Balance Dashboard", desc: "Real-time updates and analytics of your financial flow.", color: "text-purple-600", bg: "bg-purple-50" },
              { icon: Lock, title: "Google reCAPTCHA Protection", desc: "Defending endpoints against automated bots and abuse.", color: "text-rose-600", bg: "bg-rose-50" },
              { icon: Bell, title: "Real-time Notifications", desc: "Stay informed instantly whenever your money moves.", color: "text-amber-600", bg: "bg-amber-50" }
            ].map((feat, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                <div className={`w-14 h-14 ${feat.bg} ${feat.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                  <feat.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-xl text-slate-800 mb-3">{feat.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-white border border-slate-800 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px] pointer-events-none opacity-20"></div>

          <div className="relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">Get started with your digital banking experience in four simple steps.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: UserPlus, title: "Create Account", desc: "Sign up in seconds" },
                { icon: Fingerprint, title: "Verify Identity", desc: "Secure authentication" },
                { icon: LayoutDashboard, title: "Manage Banking", desc: "View your dashboard" },
                { icon: Send, title: "Transfer Securely", desc: "Send money instantly" }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center relative">
                  <div className="w-16 h-16 bg-slate-800 border-2 border-indigo-500/30 text-indigo-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/10 z-10">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-slate-100">{i + 1}. {step.title}</h3>
                  <p className="text-slate-400 font-medium">{step.desc}</p>

                  {i < 3 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-indigo-500/30 to-transparent -z-0"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security & About */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-lg shadow-slate-200/50">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Security First</h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              Bank-grade security with JWT authentication, encrypted passwords, OTP verification, and Google reCAPTCHA protection. Your financial data remains private and protected against modern web vulnerabilities.
            </p>
          </div>

          <div className="bg-indigo-50 p-10 md:p-12 rounded-[2.5rem] border border-indigo-100 shadow-inner">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <Coins className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">About the Product</h2>
            <p className="text-lg text-slate-700 font-medium leading-relaxed">
              NidhiPay is a secure digital banking platform built with modern web technologies. It demonstrates how financial systems handle authentication, account management, and secure transactions in a scalable environment.
            </p>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="mt-32 border-t border-slate-200 bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br from-indigo-500 to-indigo-700">
              N
            </div>
            <span className="text-lg font-black text-slate-800 tracking-tight">
              NidhiPay &copy; 2026
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-4 text-sm font-semibold text-slate-500">
            <span className="text-slate-400">Built with MERN Stack</span>
            <a href="https://github.com" className="hover:text-indigo-600 transition-colors">GitHub Repository</a>
            <Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact Developer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
