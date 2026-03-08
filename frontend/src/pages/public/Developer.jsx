import { Code2, Github, Linkedin } from 'lucide-react';

const Developer = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
        <Code2 className="w-8 h-8 text-indigo-600" />
        <h1 className="text-4xl font-black text-slate-900">Developer Profile</h1>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden mt-12 group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[120px] pointer-events-none group-hover:bg-indigo-400/40 transition-colors duration-700"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-400/30 transition-colors duration-700"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-12">
          {/* Profile Picture with B&W to Color Hover Effect */}
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-[2rem] border-4 border-indigo-400/50 block shrink-0 shadow-xl overflow-hidden relative group/avatar cursor-pointer">
            <div className="absolute inset-0 bg-indigo-900 animate-pulse -z-10 flex items-center justify-center text-indigo-300 font-bold text-sm text-center px-4">Save image as <br/> frontend/public/bharathprofile.jpg</div>
            <img 
              src="/bharathprofile.jpg" 
              alt="Bharath Basineni" 
              className="w-full h-full object-cover grayscale transition-all duration-500 ease-in-out group-hover/avatar:grayscale-0 group-hover/avatar:scale-110" 
            />
          </div>

          <div className="text-center md:text-left flex-1 mt-2 md:mt-4">
            <h2 className="text-4xl md:text-5xl font-black mb-3 text-white tracking-tight group-hover:text-indigo-100 transition-colors duration-300">Bharath Basineni</h2>
            <p className="text-2xl text-indigo-200 font-bold mb-2">Full Stack Developer</p>
            <p className="text-lg text-indigo-100/70 font-medium mb-10 flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_10px_rgba(52,211,153,1)]"></span>
              Specializing in the MERN Stack
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="https://github.com/BharathBasineni" target="_blank" rel="noopener noreferrer" className="px-6 py-4 bg-white text-slate-900 font-bold rounded-2xl flex items-center justify-center hover:bg-slate-100 hover:scale-105 transition-all shadow-lg hover:shadow-xl">
                <Github className="w-5 h-5 mr-3" /> GitHub Profile
              </a>
              <a href="https://www.linkedin.com/in/bharath-basineni-740190369/" target="_blank" rel="noopener noreferrer" className="px-6 py-4 bg-[#0A66C2] text-white font-bold rounded-2xl flex items-center justify-center hover:bg-[#004182] hover:scale-105 transition-all shadow-lg hover:shadow-xl">
                <Linkedin className="w-5 h-5 mr-3" /> LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developer;
