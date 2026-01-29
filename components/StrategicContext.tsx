import React from 'react';
import { TrendingUp, Scale, AlertTriangle, ArrowDown } from 'lucide-react';

const StrategicContext: React.FC = () => {
  return (
    <section id="strategy" className="py-20 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* The Defining Sentence */}
        <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-2xl md:text-3xl font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                "AtmoSmart does not replace existing systems. It <span className="text-emerald-600 dark:text-emerald-500 font-bold">connects</span> them, <span className="text-emerald-600 dark:text-emerald-500 font-bold">interprets</span> their data, and turns it into <span className="text-slate-900 dark:text-white font-bold">actionable decisions</span>."
            </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Why Now */}
            <div>
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">Market Drivers</h3>
                <h4 className="text-3xl font-display font-medium text-slate-900 dark:text-white mb-6">Why Environmental Intelligence Now?</h4>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="bg-white dark:bg-slate-800 p-3 rounded shadow-sm h-min"><Scale size={24} className="text-slate-700 dark:text-slate-300"/></div>
                        <div>
                            <h5 className="font-bold text-slate-900 dark:text-white">Regulatory Pressure</h5>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">ESG reporting is becoming mandatory for Tier-1 supply chains.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white dark:bg-slate-800 p-3 rounded shadow-sm h-min"><AlertTriangle size={24} className="text-amber-600 dark:text-amber-500"/></div>
                        <div>
                            <h5 className="font-bold text-slate-900 dark:text-white">Liability Management</h5>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Workforce health claims related to IEQ are rising annually.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white dark:bg-slate-800 p-3 rounded shadow-sm h-min"><TrendingUp size={24} className="text-emerald-600 dark:text-emerald-500"/></div>
                        <div>
                            <h5 className="font-bold text-slate-900 dark:text-white">The Intelligence Gap</h5>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Sensors are commodities. Interpretation is the scarcity.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Competitive Positioning */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6 text-center">Operational Stack Positioning</h3>
                
                <div className="space-y-2 max-w-md mx-auto relative">
                    {/* Top Layer */}
                    <div className="bg-slate-900 dark:bg-black text-white p-6 rounded-lg text-center relative z-10 shadow-lg border border-slate-800 dark:border-slate-700">
                        <h4 className="font-display font-bold text-xl tracking-wide">AtmoSmart</h4>
                        <p className="text-emerald-400 text-xs font-bold uppercase mt-1">Intelligence Layer</p>
                        <p className="text-slate-400 text-xs mt-2">Risk Evaluation & Decision Support</p>
                    </div>

                    {/* Connector */}
                    <div className="flex justify-center -my-2 relative z-0">
                        <ArrowDown className="text-slate-300 dark:text-slate-600" size={24} />
                    </div>

                    {/* Middle Layer */}
                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded text-center text-slate-400 dark:text-slate-500">
                        <h4 className="font-bold text-lg text-slate-600 dark:text-slate-300">HVAC & BMS</h4>
                        <p className="text-xs font-bold uppercase mt-1">Control Layer</p>
                    </div>

                    {/* Connector */}
                    <div className="flex justify-center -my-2 relative z-0">
                        <ArrowDown className="text-slate-300 dark:text-slate-600" size={24} />
                    </div>

                    {/* Bottom Layer */}
                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded text-center text-slate-400 dark:text-slate-500">
                        <h4 className="font-bold text-lg text-slate-600 dark:text-slate-300">IoT Sensors</h4>
                        <p className="text-xs font-bold uppercase mt-1">Data Layer</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default StrategicContext;