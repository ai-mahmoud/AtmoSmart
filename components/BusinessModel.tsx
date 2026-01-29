import React from 'react';
import { Building, Layers, CreditCard, RefreshCw, Check } from 'lucide-react';

const BusinessModel: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Pricing Structure */}
        <div className="mb-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-display font-medium text-slate-900">Enterprise Pricing Models</h2>
                <p className="mt-4 text-xl text-slate-500">Flexible deployment options for any scale.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Tier 1 */}
                <div className="border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 mb-6">
                        <Building size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide mb-2">Per Building</h3>
                    <p className="text-slate-500 text-sm mb-6">Ideal for pilots and single-facility deployments.</p>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-sm text-slate-700"><Check size={16} className="text-emerald-500" /> up to 50 Sensors</li>
                        <li className="flex items-center gap-2 text-sm text-slate-700"><Check size={16} className="text-emerald-500" /> Basic Compliance Reports</li>
                        <li className="flex items-center gap-2 text-sm text-slate-700"><Check size={16} className="text-emerald-500" /> Email Alerts</li>
                    </ul>
                </div>

                {/* Tier 2 */}
                <div className="border-2 border-emerald-500 rounded-xl p-8 shadow-xl relative">
                    <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Most Common</div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-6">
                        <Layers size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide mb-2">Multi-Site</h3>
                    <p className="text-slate-500 text-sm mb-6">For regional operations and logistics hubs.</p>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-sm text-slate-700"><Check size={16} className="text-emerald-500" /> Unlimited Sensors</li>
                        <li className="flex items-center gap-2 text-sm text-slate-700"><Check size={16} className="text-emerald-500" /> Advanced Decision Intelligence</li>
                        <li className="flex items-center gap-2 text-sm text-slate-700"><Check size={16} className="text-emerald-500" /> API Access</li>
                    </ul>
                </div>

                 {/* Tier 3 */}
                 <div className="border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 mb-6">
                        <RefreshCw size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide mb-2">SaaS Subscription</h3>
                    <p className="text-slate-500 text-sm mb-6">OpEx model for continuous compliance monitoring.</p>
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-2 text-sm text-slate-700"><Check size={16} className="text-emerald-500" /> Quarterly Audits</li>
                        <li className="flex items-center gap-2 text-sm text-slate-700"><Check size={16} className="text-emerald-500" /> Dedicated Account Manager</li>
                        <li className="flex items-center gap-2 text-sm text-slate-700"><Check size={16} className="text-emerald-500" /> Custom Integrations</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Integration Partners */}
        <div className="bg-slate-50 rounded-2xl p-10 border border-slate-200">
             <div className="text-center mb-8">
                <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest">Seamless Integration With</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Mock Logos - Text representation for code simplicity but styled like logos */}
                <div className="text-2xl font-black text-slate-800 flex items-center gap-2"><CreditCard className="text-blue-600"/> Honeywell</div>
                <div className="text-2xl font-black text-slate-800 flex items-center gap-2"><CreditCard className="text-teal-600"/> Siemens</div>
                <div className="text-2xl font-black text-slate-800 flex items-center gap-2"><CreditCard className="text-orange-600"/> AWS IoT</div>
                <div className="text-2xl font-black text-slate-800 flex items-center gap-2"><CreditCard className="text-blue-800"/> Azure</div>
                <div className="text-2xl font-black text-slate-800 flex items-center gap-2"><CreditCard className="text-green-600"/> Schneider</div>
            </div>
             <p className="text-center text-sm text-slate-400 mt-8 max-w-2xl mx-auto">
                AtmoSmart acts as an intelligence layer on top of your existing BMS and HVAC infrastructure. 
                We do not replace your systems; we make them smarter.
            </p>
        </div>

      </div>
    </section>
  );
};

export default BusinessModel;