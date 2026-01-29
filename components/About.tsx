import React from 'react';
import { XCircle, CheckCircle2, HelpCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center mb-20">
          <div>
            <h2 className="text-sm font-bold tracking-wide text-emerald-600 uppercase mb-2">Operational Risk Management</h2>
            <h3 className="text-3xl font-display font-medium text-gray-900 sm:text-4xl mb-6">
              The Invisible Cost of Non-Compliance
            </h3>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Industrial facilities face a dual challenge: adhering to increasingly strict environmental regulations (ESG) while maintaining optimal workforce productivity. 
                Unmonitored fluctuations in Particulate Matter (PM) and volatile organic compounds create liability risks and degrade operational efficiency.
              </p>
              <p>
                Legacy solutions rely on static, grid-dependent monitoring that offers data but lacks context. 
                AtmoSmart delivers an autonomous, predictive intelligence layer, transforming raw environmental data into actionable compliance strategies and automated safety protocols.
              </p>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 relative">
             <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-slate-500 transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl opacity-10"></div>
             <div className="relative rounded-2xl shadow-xl overflow-hidden bg-gray-900 border border-gray-800">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2670" 
                  alt="Modern industrial facility" 
                  className="w-full h-full object-cover opacity-60 hover:opacity-75 transition-opacity duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                    <p className="font-mono text-xs text-emerald-400 mb-1">REAL-TIME RISK MONITORING</p>
                    <p className="font-display text-lg">Optimizing Indoor Environmental Quality (IEQ)</p>
                </div>
             </div>
          </div>
        </div>

        {/* Before vs After Comparison */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200">
              <h4 className="text-lg font-bold text-slate-500 mb-6 uppercase tracking-widest">Without AtmoSmart</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-500">
                  <XCircle className="text-rose-400 shrink-0 mt-0.5" size={20} />
                  <span>Reactive inspections only after incidents occur</span>
                </li>
                <li className="flex items-start gap-3 text-slate-500">
                  <XCircle className="text-rose-400 shrink-0 mt-0.5" size={20} />
                  <span>Manual reporting prone to human error</span>
                </li>
                <li className="flex items-start gap-3 text-slate-500">
                  <XCircle className="text-rose-400 shrink-0 mt-0.5" size={20} />
                  <span>Hidden exposure risks & liability</span>
                </li>
                <li className="flex items-start gap-3 text-slate-500">
                  <XCircle className="text-rose-400 shrink-0 mt-0.5" size={20} />
                  <span>No historical insight for ESG audits</span>
                </li>
              </ul>
            </div>
            <div className="p-8 bg-white">
              <h4 className="text-lg font-bold text-emerald-600 mb-6 uppercase tracking-widest">With AtmoSmart</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-800 font-medium">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                  <span>Continuous 24/7 monitoring & predictive alerts</span>
                </li>
                <li className="flex items-start gap-3 text-slate-800 font-medium">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                  <span>Automated, audit-ready compliance reports</span>
                </li>
                <li className="flex items-start gap-3 text-slate-800 font-medium">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                  <span>Reduced liability via proactive mitigation</span>
                </li>
                <li className="flex items-start gap-3 text-slate-800 font-medium">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                  <span>Data-driven decisions for workforce health</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Strategic Differentiator FAQ */}
        <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-bold text-sm mb-4">
                <HelpCircle size={16} /> Strategic Differentiator
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Q: Why not just use standard sensors?</h3>
            <p className="text-lg text-slate-600">
                A: Sensors only show raw data. AtmoSmart <span className="text-slate-900 font-bold">interprets</span> that data, detects regulatory risks, and translates it into immediate operational decisions. We provide intelligence, not just numbers.
            </p>
        </div>

      </div>
    </section>
  );
};

export default About;