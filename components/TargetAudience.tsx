import React from 'react';
import { HardHat, Briefcase, FileCheck, BarChart } from 'lucide-react';

const TargetAudience: React.FC = () => {
  const personas = [
    {
      role: "Facility Manager",
      icon: <HardHat size={32} />,
      desc: "Monitors indoor air risk across multiple buildings and ensures HVAC performance.",
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      role: "HSE Manager",
      icon: <FileCheck size={32} />,
      desc: "Ensures workforce safety compliance (OSHA/ISO) and maintains audit-readiness.",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      role: "Operations Director",
      icon: <BarChart size={32} />,
      desc: "Optimizes productivity by reducing environmental downtime and sick leave.",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      role: "ESG Officer",
      icon: <Briefcase size={32} />,
      desc: "Generates environmental data for sustainability reporting and stakeholder trust.",
      color: "text-slate-600",
      bg: "bg-slate-100"
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold tracking-widest text-emerald-600 uppercase mb-2">Designed For Professionals</h2>
          <h3 className="text-3xl font-display font-medium text-slate-900">Who Uses AtmoSmart?</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((persona) => (
            <div key={persona.role} className="p-6 rounded-xl border border-slate-100 bg-white hover:shadow-lg hover:border-emerald-100 transition-all group">
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 ${persona.bg} ${persona.color}`}>
                {persona.icon}
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">{persona.role}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{persona.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;