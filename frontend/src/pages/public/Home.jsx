import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, CreditCard } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full flex justify-center pb-24">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Organic Hero Section */}
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden rounded-[3rem] bg-[#FAFAFA] border border-slate-100 mt-8 mb-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-50/50 to-emerald-50/50 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 font-medium text-sm mb-10 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              NidhiPay is now in public beta
            </div>
            
            <h1 className="text-5xl md:text-7xl font-semibold text-[#111827] tracking-tight leading-[1.05] mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Banking that works <br className="hidden md:block"/> for you, not against you.
            </h1>
            <p className="text-xl md:text-2xl text-[#4B5563] mb-12 font-normal leading-relaxed max-w-2xl mx-auto">
              NidhiPay is the effortless way to manage your personal finances. Send money instantly, track spending in real-time, and experience bank-grade security without the bank-grade headaches.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="group w-full sm:w-auto px-8 py-4 bg-[#111827] text-white font-medium rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center text-lg shadow-lg shadow-slate-900/10 active:scale-95">
                Open your free account
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="https://github.com/BharathBasineni/Digital-Banking-System-NidhiPay-" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-white text-[#374151] border border-slate-200 font-medium rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center text-lg focus:outline-none focus:ring-2 focus:ring-slate-200 active:scale-95 shadow-sm">
                Read the documentation
              </a>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-12 md:py-20 mb-12">
           <div className="text-center max-w-3xl mx-auto mb-20 px-4">
             <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 tracking-tight leading-snug">Everything you expect from a bank.<br/> Nothing you don't.</h2>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8 md:gap-16 px-4 md:px-12">
             <div className="flex flex-col items-center md:items-start text-center md:text-left transition-transform hover:-translate-y-1 duration-300">
               <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-6 shadow-sm">
                 <Zap strokeWidth={2} className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-semibold text-slate-900 mb-3">Instant Transfers</h3>
               <p className="text-slate-600 leading-relaxed font-medium text-lg">Why wait 3-5 business days? Send money to friends or loved ones instantly. It just works.</p>
             </div>
             
             <div className="flex flex-col items-center md:items-start text-center md:text-left transition-transform hover:-translate-y-1 duration-300">
               <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-6 shadow-sm">
                 <ShieldCheck strokeWidth={2} className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-semibold text-slate-900 mb-3">Enterprise Security</h3>
               <p className="text-slate-600 leading-relaxed font-medium text-lg">Your data is secured by JWT hashing and two-factor (2FA) protection built right into the platform.</p>
             </div>
             
             <div className="flex flex-col items-center md:items-start text-center md:text-left transition-transform hover:-translate-y-1 duration-300">
               <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-6 shadow-sm">
                 <CreditCard strokeWidth={2} className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-semibold text-slate-900 mb-3">No Hidden Fees</h3>
               <p className="text-slate-600 leading-relaxed font-medium text-lg">We don't charge you for holding your money. What you see on your dashboard is exactly what you get.</p>
             </div>
           </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
