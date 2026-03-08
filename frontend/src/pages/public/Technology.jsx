import { Layers, Server, Smartphone, Database, Lock } from 'lucide-react';

const Technology = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
        <Layers className="w-8 h-8 text-indigo-600" />
        <h1 className="text-4xl font-black text-slate-900">Technology Stack</h1>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <Smartphone className="w-8 h-8" />
          </div>
          <h2 className="font-bold text-2xl text-slate-800 mb-6">Frontend</h2>
          <ul className="space-y-4 text-slate-600 font-medium text-lg">
            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-500"></div> React.js</li>
            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Tailwind CSS</li>
            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-500"></div> React Router DOM</li>
          </ul>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
            <Server className="w-8 h-8" />
          </div>
          <h2 className="font-bold text-2xl text-slate-800 mb-6">Backend</h2>
          <ul className="space-y-4 text-slate-600 font-medium text-lg">
            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Node.js</li>
            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Express.js</li>
            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> REST API Architecture</li>
          </ul>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
            <Database className="w-8 h-8" />
          </div>
          <h2 className="font-bold text-2xl text-slate-800 mb-6">Database</h2>
          <ul className="space-y-4 text-slate-600 font-medium text-lg">
            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-amber-500"></div> MongoDB Atlas</li>
            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Mongoose ODM</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="font-bold text-2xl text-slate-800 mb-6">Security</h2>
          <ul className="space-y-4 text-slate-600 font-medium text-lg">
            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-rose-500"></div> JWT Authentication</li>
            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-rose-500"></div> bcrypt password hashing</li>
            <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-rose-500"></div> CAPTCHA protection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Technology;
