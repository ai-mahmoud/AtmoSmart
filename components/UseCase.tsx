import React from 'react';
import { Factory, XCircle, CheckCircle2 } from 'lucide-react';

const UseCase: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-start">
            
            {/* Context Side */}
            <div className="md:w-1/3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase mb-6">
                    <Factory size={14} /> Operational Case Study
                </div>
                <h3 className="text-3xl font-display font-medium text-slate-900 dark:text-white mb-4">Mid-Sized Manufacturing Facility</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    A metal fabrication plant facing workforce fatigue complaints and inconsistent audit results.
                </p>
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Site Profile</h4>
                    <ul className="space-y-3">
                        <li className="flex justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-400">Infrastructure</span>
                            <span className="font-bold text-slate-900 dark:text-white">3 Buildings</span>
                        </li>
                         <li className="flex justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-400">Workforce</span>
                            <span className="font-bold text-slate-900 dark:text-white">120 Employees</span>
                        </li>
                         <li className="flex justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-400">Baseline AQI</span>
                            <span className="font-bold text-rose-600 dark:text-rose-500">230 (Hazardous)</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Comparison Side */}
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-0 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="p-8 bg-slate-50 dark:bg-slate-900 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
                    <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        Legacy Approach
                    </h4>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-3 opacity-70">
                            <XCircle className="text-slate-400 shrink-0 mt-0.5" size={20} />
                            <div>
                                <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">No Visibility</p>
                                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Reactive response to employee complaints.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 opacity-70">
                            <XCircle className="text-slate-400 shrink-0 mt-0.5" size={20} />
                            <div>
                                <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">Audit Failures</p>
                                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Lack of historical data during inspections.</p>
                            </div>
                        </li>
                         <li className="flex items-start gap-3 opacity-70">
                            <XCircle className="text-slate-400 shrink-0 mt-0.5" size={20} />
                            <div>
                                <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">Manual Ventilation</p>
                                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">HVAC run at fixed intervals regardless of load.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="p-8 bg-white dark:bg-slate-950 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-bl-full -mr-10 -mt-10 z-0"></div>
                    <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-500 uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10">
                        AtmoSmart Protocol
                    </h4>
                    <ul className="space-y-6 relative z-10">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">Continuous Tracking</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Real-time AQI heatmap across all zones.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">Automated Compliance</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Monthly audit reports generated automatically.</p>
                            </div>
                        </li>
                         <li className="flex items-start gap-3">
                            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white text-sm">Predictive Mitigation</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Alerts triggered when AQI trends &gt; 200.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default UseCase;