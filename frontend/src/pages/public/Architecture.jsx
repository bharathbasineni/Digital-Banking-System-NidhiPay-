import { Network, User, Smartphone, Server, Database, ArrowRight } from 'lucide-react';

const Architecture = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
        <Network className="w-8 h-8 text-indigo-600" />
        <h1 className="text-4xl font-black text-slate-900">System Architecture</h1>
      </div>
      
      <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white border border-slate-800 shadow-2xl mt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <h2 className="text-3xl font-bold mb-6 relative z-10">Application Flow Diagram</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-800/80 backdrop-blur-md p-8 rounded-[2rem] border border-slate-700 font-mono text-sm md:text-base relative z-10 my-12">
          <div className="flex flex-col items-center p-6 bg-slate-800 rounded-2xl w-full md:w-auto border border-slate-700 shadow-lg relative">
            <User className="w-10 h-10 text-slate-300 mb-3" />
            <span className="font-bold text-white text-lg">Client</span>
            <span className="text-slate-400 text-sm mt-1">Browser</span>
          </div>
          
          <ArrowRight className="text-slate-400 hidden md:block w-8 h-8" />
          <div className="text-slate-500 md:hidden h-8 flex items-center justify-center">↓</div>
          
          <div className="flex flex-col items-center p-6 bg-blue-900/40 rounded-2xl w-full md:w-auto border border-blue-800 shadow-lg">
            <Smartphone className="w-10 h-10 text-blue-400 mb-3" />
            <span className="font-bold text-white text-lg">React Frontend</span>
            <span className="text-blue-200/50 text-sm mt-1">Vite + UI</span>
          </div>
          
          <ArrowRight className="text-slate-400 hidden md:block w-8 h-8" />
          <div className="text-slate-500 md:hidden h-8 flex items-center justify-center">↓</div>
          
          <div className="flex flex-col items-center p-6 bg-emerald-900/40 rounded-2xl w-full md:w-auto border border-emerald-800 shadow-lg">
            <Server className="w-10 h-10 text-emerald-400 mb-3" />
            <span className="font-bold text-white text-lg">Node.js API</span>
            <span className="text-emerald-200/50 text-sm mt-1">Express.js server</span>
          </div>
          
          <ArrowRight className="text-slate-400 hidden md:block w-8 h-8" />
          <div className="text-slate-500 md:hidden h-8 flex items-center justify-center">↓</div>
          
          <div className="flex flex-col items-center p-6 bg-amber-900/40 rounded-2xl w-full md:w-auto border border-amber-800 shadow-lg">
            <Database className="w-10 h-10 text-amber-400 mb-3" />
            <span className="font-bold text-white text-lg">MongoDB Atlas</span>
            <span className="text-amber-200/50 text-sm mt-1">Cloud DB cluster</span>
          </div>
        </div>

        <div className="max-w-none relative z-10 text-slate-300">
          <h3 className="text-2xl font-bold text-white mb-4">Request Flow Explained</h3>
          <p className="text-lg leading-relaxed mb-4">
            The application follows a standard decoupled REST API architectural pattern. The lifecycle originates from the <strong>Client browser</strong> interacting with the React Frontend.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Events trigger asynchronous requests routing through the <strong>Node.js API</strong> layer.
          </p>
          <p className="text-lg leading-relaxed">
            The backend handles business logic and routes requests to the <strong>MongoDB Atlas</strong> cloud cluster for persistence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Architecture;
