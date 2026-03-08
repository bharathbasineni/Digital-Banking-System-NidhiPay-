import { Link, Outlet, useLocation } from 'react-router-dom';

const PublicLayout = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Technology Stack', path: '/technology' },
    { name: 'Architecture', path: '/architecture' },
    { name: 'Features', path: '/features' },
    { name: 'Modules', path: '/modules' },
    { name: 'Developer', path: '/developer' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-['Inter',sans-serif] selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
      {/* Navigation */}
      <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm">
              N
            </div>
            <span className="text-2xl font-black text-slate-800 tracking-tight hidden lg:block">
              NidhiPay Project
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-colors ${
                  (location.pathname === link.path || (link.path === '/' && location.pathname === '/home'))
                    ? 'text-indigo-600'
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-5 py-2.5 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition-colors text-sm">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        <Outlet />
      </main>

      {/* Corporate Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 mt-auto">
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
            <a href="https://github.com/BharathBasineni" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">Project Documentation</a>
            <a href="https://github.com/BharathBasineni" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">GitHub Repository</a>
            <a href="mailto:contact@example.com" className="hover:text-indigo-600 transition-colors">Contact Developer</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
