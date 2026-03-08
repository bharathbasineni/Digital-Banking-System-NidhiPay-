import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors">
      <Sidebar />
      <div className="flex-col flex-1 overflow-hidden transition-all duration-300">
        <Navbar />
        <main className="flex-1 overflow-y-auto w-full p-8 hidden-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
