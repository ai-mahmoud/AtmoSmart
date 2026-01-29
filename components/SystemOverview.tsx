import React from 'react';
import { Cpu, Database, Share2, Activity, ShieldAlert } from 'lucide-react';

const SystemOverview: React.FC = () => {
  return (
    <section id="system" className="py-20 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-medium text-slate-900 dark:text-white sm:text-4xl">Platform Architecture</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500 dark:text-slate-400">
            A vertically integrated solution from edge sensing to executive reporting.
          </p>
        </div>

        <div className="relative">
            {/* Connector Line - z-0 to sit behind cards but above section background */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 z-0 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {/* Node 1 */}
                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center relative z-10 group hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full flex items-center justify-center mb-4 border-4 border-white dark:border-slate-950 shadow-sm group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        <Activity size={28} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Data Acquisition</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Multi-spectrum environmental sensor array (Gas/PM/Thermal)</p>
                </div>

                {/* Node 2 */}
                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center relative z-10 group hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full flex items-center justify-center mb-4 border-4 border-white dark:border-slate-950 shadow-sm group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        <Share2 size={28} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Edge Gateway</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Secure protocol transmission & local pre-processing logic</p>
                </div>

                {/* Node 3 */}
                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center relative z-10 group hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full flex items-center justify-center mb-4 border-4 border-white dark:border-slate-950 shadow-sm group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        <Database size={28} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Cloud Core</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Scalable ingestion layer & historical compliance logging</p>
                </div>

                {/* Node 4 */}
                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center relative z-10 group hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full flex items-center justify-center mb-4 border-4 border-white dark:border-slate-950 shadow-sm group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        <Cpu size={28} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Decision Intelligence</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Risk evaluation engine & automated mitigation triggering</p>
                </div>

                {/* Node 5 */}
                <div className="bg-white dark:bg-slate-950 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center relative z-10 group hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full flex items-center justify-center mb-4 border-4 border-white dark:border-slate-950 shadow-sm group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        <ShieldAlert size={28} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Decision Support</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Role-based command center for facility management</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default SystemOverview;