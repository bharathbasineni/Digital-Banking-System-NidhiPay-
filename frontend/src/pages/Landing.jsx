import { Link } from 'react-router-dom';
import { 
  Server, Database, Shield, Smartphone, Code, 
  Github, User, CheckCircle2, ArrowRight, 
  LayoutDashboard, History, Send, CreditCard, Lock, Layers
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-['Inter',sans-serif] selection:bg-indigo-100 selection:text-indigo-900 pb-20">
      
      {/* Navigation */}
      <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm">
              N
            </div>
            <span className="text-2xl font-black text-slate-800 tracking-tight">
              NidhiPay Project
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-semibold transition-colors mr-2">
              <Github className="w-5 h-5" /> Source Code
            </a>
            <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-semibold transition-colors">
              App Login
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 mt-16 space-y-24">
        
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-sm mb-6">
            <Code className="w-4 h-4" /> MERN Stack Portfolio Project
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Full-Stack Digital <br className="hidden md:block"/> Banking Application
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
            NidhiPay is a technical demonstration of secure user authentication, account management, fund transfers, and transaction tracking built with modern web technologies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center text-lg shadow-sm">
              Live Demo - Open Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-800 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center text-lg">
              <Github className="mr-2 w-5 h-5" /> View on GitHub
            </a>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Layers className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl font-bold text-slate-900">Technology Stack</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-4">Frontend</h3>
              <ul className="space-y-2 text-slate-600 font-medium">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> React.js</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Tailwind CSS</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Vite</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Context API</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-4">Backend</h3>
              <ul className="space-y-2 text-slate-600 font-medium">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Node.js</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Express.js</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> RESTful API</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Rate Limiting</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-4">Database</h3>
              <ul className="space-y-2 text-slate-600 font-medium">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> MongoDB Atlas</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Mongoose ODM</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Aggregation</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Data Modeling</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-4">Security</h3>
              <ul className="space-y-2 text-slate-600 font-medium">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> JWT Authentication</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> bcrypt Password Hash</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> Security PINs</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> CAPTCHA Protection</li>
              </ul>
            </div>
          </div>
        </section>

        {/* System Architecture */}
        <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white border border-slate-800 shadow-lg">
          <h2 className="text-3xl font-bold mb-4">System Architecture</h2>
          <p className="text-slate-400 mb-8 max-w-2xl text-lg">
            NidhiPay follows a standard REST API architecture utilizing the MERN stack for scalable, decoupled application development.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 font-mono text-sm md:text-base">
            <div className="flex flex-col items-center p-4 bg-slate-800 rounded-xl w-full md:w-auto border border-slate-700">
              <User className="w-8 h-8 text-blue-400 mb-2" />
              <span className="font-bold text-slate-300">Client / Browser</span>
            </div>
            
            <ArrowRight className="text-slate-500 hidden md:block" />
            <div className="text-slate-500 md:hidden">↓</div>
            
            <div className="flex flex-col items-center p-4 bg-blue-900/30 rounded-xl w-full md:w-auto border border-blue-800">
              <Smartphone className="w-8 h-8 text-blue-400 mb-2" />
              <span className="font-bold text-blue-300">React Frontend</span>
            </div>
            
            <ArrowRight className="text-slate-500 hidden md:block" />
            <div className="text-slate-500 md:hidden">↓</div>
            
            <div className="flex flex-col items-center p-4 bg-emerald-900/30 rounded-xl w-full md:w-auto border border-emerald-800">
              <Server className="w-8 h-8 text-emerald-400 mb-2" />
              <span className="font-bold text-emerald-300">Node.js API</span>
            </div>
            
            <ArrowRight className="text-slate-500 hidden md:block" />
            <div className="text-slate-500 md:hidden">↓</div>
            
            <div className="flex flex-col items-center p-4 bg-amber-900/30 rounded-xl w-full md:w-auto border border-amber-800">
              <Database className="w-8 h-8 text-amber-400 mb-2" />
              <span className="font-bold text-amber-300">MongoDB Atlas</span>
            </div>
          </div>
        </section>

        {/* System Features Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle2 className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl font-bold text-slate-900">Implemented System Features</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
            {[
              'User account registration and secured login via JWT',
              'Unique 10-digit bank account number generation on creation',
              'Account balances with secure deposit and withdrawal logic',
              'Internal fund transfers routing via account numbers',
              'Granular transaction history and timeline tracking',
              'Secondary Security PIN verification required for outgoing transfers',
              'Google reCAPTCHA integration shielding authentication endpoints',
              'Cloud data persistence leveraging MongoDB Atlas clusters'
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm font-bold">{i + 1}</span>
                </div>
                <p className="text-slate-700 font-medium text-lg leading-snug">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Visual Modules / Screenshots */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <LayoutDashboard className="w-8 h-8 text-indigo-600" />
            <h2 className="text-3xl font-bold text-slate-900">Application Modules</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Banking Dashboard</h3>
              <p className="text-slate-600 font-medium">Real-time aggregate view of balances, recent activity, and financial charting representing cash flow.</p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <History className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Transaction History</h3>
              <p className="text-slate-600 font-medium">Detailed chronologic ledger of all deposits, withdrawals, and account-to-account transfers.</p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Fund Transfers</h3>
              <p className="text-slate-600 font-medium">Securely execute peer-to-peer balance routing utilizing unique generated account strings and mandatory PINs.</p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Security Profile</h3>
              <p className="text-slate-600 font-medium">A dedicated interface highlighting active session IP tracking, fail-logs, and 2FA authentication state toggles.</p>
            </div>
          </div>
        </section>

        {/* Developer Info Profile */}
        <section className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[80px] pointer-events-none opacity-50"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 rounded-full border-4 border-indigo-400 bg-indigo-800 flex items-center justify-center shrink-0 shadow-lg text-4xl font-black">
              BB
            </div>
            <div className="text-center md:text-left">
              <p className="text-indigo-200 font-bold uppercase tracking-widest text-sm mb-2">Developed By</p>
              <h2 className="text-3xl font-black mb-2">Bharath Basineni</h2>
              <p className="text-xl text-indigo-100 font-medium mb-6">Full Stack Developer &bull; MERN Stack Specialist</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="https://github.com/BharathBasineni" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-indigo-700 font-bold rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors">
                  <Github className="w-5 h-5 mr-2" /> Developer GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Corporate Footer */}
      <footer className="mt-24 border-t border-slate-200 bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              N
            </div>
            <span className="text-lg font-black text-slate-800 tracking-tight">
              NidhiPay Project Repository
            </span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 text-sm font-semibold text-slate-600">
            <a href="https://github.com" className="hover:text-indigo-600 transition-colors">Project Documentation</a>
            <a href="https://github.com" className="hover:text-indigo-600 transition-colors">GitHub Repository</a>
            <a href="mailto:developer@example.com" className="hover:text-indigo-600 transition-colors">Contact Developer</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
