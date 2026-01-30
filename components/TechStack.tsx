import React from 'react';
import { TechItem } from '../types';
import { Cpu, Cloud, Wind, Lock, ShieldCheck, Workflow } from 'lucide-react';
import DigitalTwin from './DigitalTwin';

const techItems: TechItem[] = [
  {
    name: 'Industrial Edge Gateway',
    icon: <Cpu size={40} className="text-slate-600 dark:text-slate-400" />,
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
    icon: <Lock size={40} className="text-slate-700 dark:text-slate-300" />,
    description: 'Role-based frontend architecture designed for facility managers and safety officers.'
  }
];

const TechStack: React.FC = () => {
  return (
    <section id="tech" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-medium text-slate-900 dark:text-white">Infrastructure Components</h2>
          <p className="mt-4 text-xl text-slate-500 dark:text-slate-400">Built on industry-standard protocols for reliability and scale.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {techItems.map((item) => (
            <div key={item.name} className="flex flex-col items-center text-center p-8 bg-slate-50 dark:bg-slate-900 rounded-xl hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 group">
              <div className="h-20 w-20 flex items-center justify-center mb-6 bg-white dark:bg-slate-950 rounded-full shadow-sm border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Analytical Digital Twin Section - Functional Component */}
        <div className="mb-16">
            <div className="flex flex-col items-center text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase mb-4">
                    <Workflow size={14} /> Analytical Architecture
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-medium text-slate-900 dark:text-white mb-4">
                    The Analytical Digital Twin
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-3xl">
                    We do not build 3D visualizations. We build <span className="font-bold text-slate-900 dark:text-white">mathematical state representations</span>. 
                    Our digital twin continuously synchronizes with facility telemetry to run probabilistic simulations—testing risk scenarios and compliance outcomes—without disrupting physical infrastructure.
                </p>
            </div>
            
            {/* The Actual Simulation Widget */}
            <DigitalTwin />
        </div>

        {/* Data Sovereignty Section */}
        <div className="bg-slate-900 dark:bg-black rounded-xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl">
            <div className="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="p-4 bg-emerald-500/20 rounded-full mb-4 text-emerald-400">
                    <ShieldCheck size={48} />
                </div>
                <h3 className="text-xl font-bold font-display uppercase tracking-wide">Enterprise Data Sovereignty</h3>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-4 bg-slate-800 dark:bg-slate-900 rounded border border-slate-700">
                    <h4 className="font-bold text-emerald-400 mb-2">Customer Owned</h4>
                    <p className="text-sm text-slate-400">You retain 100% ownership of all telemetry data. We do not sell or monetize your operational metrics.</p>
                </div>
                 <div className="p-4 bg-slate-800 dark:bg-slate-900 rounded border border-slate-700">
                    <h4 className="font-bold text-emerald-400 mb-2">Read-Only Default</h4>
                    <p className="text-sm text-slate-400">Our platform operates on a read-only basis for BMS integration, preventing unauthorized actuation.</p>
                </div>
                 <div className="p-4 bg-slate-800 dark:bg-slate-900 rounded border border-slate-700">
                    <h4 className="font-bold text-emerald-400 mb-2">Encrypted Storage</h4>
                    <p className="text-sm text-slate-400">AES-256 encryption at rest and TLS 1.3 in transit ensures industrial-grade security.</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;