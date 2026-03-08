import { Info } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
        <Info className="w-8 h-8 text-indigo-600" />
        <h1 className="text-4xl font-black text-slate-900">About the Project</h1>
      </div>
      
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">What is NidhiPay?</h2>
        <p className="text-lg text-slate-600 leading-relaxed font-medium">
          NidhiPay is a complete full-stack digital banking demo application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It demonstrates secure authentication, account management, and real-time financial transaction tracking.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-8">Purpose of the project</h2>
        <p className="text-lg text-slate-600 leading-relaxed font-medium">
          The goal of this application is to showcase the ability to build and deploy a complex, secure, and fully functional web application that mimics real-world enterprise constraints. It highlights expertise in modern UI frameworks, REST API interactions, state management, and NoSQL data relations.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mt-8">Key functionalities</h2>
        <ul className="list-disc list-inside text-lg text-slate-600 leading-relaxed font-medium space-y-2 marker:text-indigo-600">
          <li>End-to-End JWT Authentication workflows with 2FA support</li>
          <li>Mathematical precision and validation for arbitrary financial data</li>
          <li>Real-time mock transaction history and localized tracking</li>
          <li>Responsive, specialized, accessible frontend dashboards</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
