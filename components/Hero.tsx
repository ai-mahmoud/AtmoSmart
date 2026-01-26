import React from 'react';
import { Activity, Sun, ShieldCheck, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-white pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden border-b border-slate-200">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-mono mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            SYSTEM STATUS: ONLINE
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-slate-900 tracking-tight mb-6 uppercase">
            Solar Powered <span className="text-emerald-600">Air Purifier</span>
          </h1>
          
          <p className="text-xl sm:text-2xl font-light text-slate-500 tracking-wide mb-8 border-y border-slate-100 py-4">
            with Smart IoT Monitoring System
          </p>
          
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
            AtmoSmart integrates renewable energy autonomy with advanced environmental sensing. 
            A closed-loop solution for sustainable air quality management.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#dashboard" className="px-8 py-3 rounded bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all flex items-center gap-2 group">
              <Activity size={18} />
              Open Dashboard
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#system" className="px-8 py-3 rounded bg-white text-slate-700 font-medium border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-all flex items-center gap-2">
              <Sun size={18} />
              System Architecture
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-white p-8 hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded flex items-center justify-center mb-4">
              <Sun size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2 uppercase tracking-wide">Energy Autonomous</h3>
            <p className="text-sm text-slate-600">Off-grid operation utilizing high-efficiency solar arrays and Li-Ion storage.</p>
          </div>
          <div className="bg-white p-8 hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded flex items-center justify-center mb-4">
              <Activity size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2 uppercase tracking-wide">Real-time Telemetry</h3>
            <p className="text-sm text-slate-600">Continuous data streaming via ESP8266 to ThingSpeak IoT cloud platform.</p>
          </div>
          <div className="bg-white p-8 hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded flex items-center justify-center mb-4">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2 uppercase tracking-wide">Active Filtration</h3>
            <p className="text-sm text-slate-600">Threshold-based actuation of carbon filter systems for optimal air quality.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;