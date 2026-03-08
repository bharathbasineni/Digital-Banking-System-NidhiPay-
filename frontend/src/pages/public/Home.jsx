import { Link } from 'react-router-dom';
import { Code, ArrowRight, Github } from 'lucide-react';

const Home = () => {
  return (
    <section className="text-center max-w-4xl mx-auto mt-12 md:mt-24">
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
        <a href="https://github.com/BharathBasineni" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-800 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center text-lg">
          <Github className="mr-2 w-5 h-5" /> View Source Code
        </a>
      </div>
    </section>
  );
};

export default Home;
