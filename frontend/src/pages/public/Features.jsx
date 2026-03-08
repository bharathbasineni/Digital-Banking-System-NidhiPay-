import { CheckCircle2, ListChecks } from 'lucide-react';

const Features = () => {
  const features = [
    'User authentication and registration',
    'Unique account number generation',
    'Secure deposit and withdrawal',
    'Account-to-account transfer',
    'Transaction history tracking',
    'Security PIN verification',
    'CAPTCHA protection',
    'Cloud database storage'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
        <ListChecks className="w-8 h-8 text-indigo-600" />
        <h1 className="text-4xl font-black text-slate-900">Implemented System Features</h1>
      </div>
      
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm mt-8">
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 mt-1">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-slate-800 font-bold text-lg leading-relaxed">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
