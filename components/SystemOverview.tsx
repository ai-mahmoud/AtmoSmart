import React from 'react';
import { Cpu, Cloud, Zap, Fan, Database, Share2, Activity, ShieldAlert } from 'lucide-react';

const SystemOverview: React.FC = () => {
  return (
    <section id="system" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-medium text-slate-900 sm:text-4xl">Platform Architecture</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
            A vertically integrated solution from edge sensing to executive reporting.
          </p>
        </div>

        <div className="relative">
            {/* Connector Line - z-0 to sit behind cards but above section background */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 z-0 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {/* Node 1 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center text-center relative z-10 group hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-16 h-16 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                        <Activity size={28} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Data Acquisition</h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">Multi-spectrum environmental sensor array (Gas/PM/Thermal)</p>
                </div>

                {/* Node 2 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center text-center relative z-10 group hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-16 h-16 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                        <Share2 size={28} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Edge Gateway</h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">Secure protocol transmission & local pre-processing logic</p>
                </div>

                {/* Node 3 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center text-center relative z-10 group hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-16 h-16 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                        <Database size={28} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Cloud Core</h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">Scalable ingestion layer & historical compliance logging</p>
                </div>

                {/* Node 4 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center text-center relative z-10 group hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-16 h-16 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                        <Cpu size={28} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Intelligence Engine</h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">AI-driven risk analysis & automated mitigation triggering</p>
                </div>

                {/* Node 5 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center text-center relative z-10 group hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-16 h-16 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                        <ShieldAlert size={28} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Decision Support</h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">Role-based command center for facility management</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default SystemOverview;