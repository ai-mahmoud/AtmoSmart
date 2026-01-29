import React from 'react';
import { Activity, Zap, ShieldCheck, ArrowRight, BarChart3, Lock, BrainCircuit } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-white dark:bg-slate-950 pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden border-b border-slate-200 dark:border-slate-900">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-400 text-xs font-mono mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-500"></span>
            </span>
            PLATFORM STATUS: OPERATIONAL
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-slate-900 dark:text-white tracking-tight mb-6 uppercase">
            Enterprise <span className="text-emerald-600 dark:text-emerald-500">Environmental</span> Intelligence
          </h1>
          
          <p className="text-xl sm:text-2xl font-light text-slate-500 dark:text-slate-400 tracking-wide mb-8 border-y border-slate-100 dark:border-slate-800 py-4">
            Turn air quality data into operational resilience, regulatory compliance, and workforce productivity.
          </p>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50 rounded-lg p-4 mb-8 max-w-2xl mx-auto flex items-start gap-3 text-left">
            <BrainCircuit className="text-amber-600 dark:text-amber-500 shrink-0 mt-1" size={24} />
            <div>
              <p className="text-sm font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wide">Business Risk Alert</p>
              <p className="text-slate-700 dark:text-slate-300 text-base">
                Indoor air pollution can reduce workforce cognitive performance by up to <span className="font-bold text-slate-900 dark:text-white">15%</span>. AtmoSmart prevents this invisible loss.
              </p>
            </div>
          </div>
          
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            AtmoSmart provides a closed-loop ecosystem for automated risk management. 
            From edge sensing to executive decision support.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#dashboard" className="px-8 py-3 rounded bg-slate-900 dark:bg-emerald-600 text-white font-medium hover:bg-slate-800 dark:hover:bg-emerald-500 transition-all flex items-center gap-2 group shadow-lg shadow-slate-200 dark:shadow-none">
              <BarChart3 size={18} />
              Launch Command Center
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#system" className="px-8 py-3 rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-medium border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all flex items-center gap-2">
              <Activity size={18} />
              View Architecture
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-white dark:bg-slate-900 p-8 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded flex items-center justify-center mb-4 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              <Zap size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide">Resilient Infrastructure</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Compatible with solar-autonomous edge systems for off-grid industrial deployment.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded flex items-center justify-center mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              <Lock size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide">Secure Telemetry</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">End-to-end encrypted data transmission from edge gateway to central compliance cloud.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded flex items-center justify-center mb-4 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wide">Automated Mitigation</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Threshold-based filtration actuation ensuring immediate risk reduction without human intervention.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;