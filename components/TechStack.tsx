import React from 'react';
import { TechItem } from '../types';
import { Cpu, Cloud, Wind, Lock } from 'lucide-react';

const techItems: TechItem[] = [
  {
    name: 'Industrial Edge Gateway',
    icon: <Cpu size={40} className="text-slate-600" />,
    description: 'High-throughput microcontroller handling secure telemetry encryption and local actuation logic.'
  },
  {
    name: 'Cloud Data Aggregation',
    icon: <Cloud size={40} className="text-blue-500" />,
    description: 'Scalable IoT backend architecture ensuring 99.9% uptime for historical compliance auditing.'
  },
  {
    name: 'Multi-Spectrum Sensing',
    icon: <Wind size={40} className="text-emerald-500" />,
    description: 'Calibrated sensor array detecting VOCs, CO2, and Particulate Matter with industrial precision.'
  },
  {
    name: 'Compliance Platform',
    icon: <Lock size={40} className="text-slate-700" />,
    description: 'Role-based frontend architecture designed for facility managers and safety officers.'
  }
];

const TechStack: React.FC = () => {
  return (
    <section id="tech" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-medium text-slate-900">Infrastructure Components</h2>
          <p className="mt-4 text-xl text-slate-500">Built on industry-standard protocols for reliability and scale.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {techItems.map((item) => (
            <div key={item.name} className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100 group">
              <div className="h-20 w-20 flex items-center justify-center mb-6 bg-white rounded-full shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.name}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;