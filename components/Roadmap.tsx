import React from 'react';
import { Eye, Brain, Network, BarChart } from 'lucide-react';

const Roadmap: React.FC = () => {
  const steps = [
    {
        phase: "Phase 1",
        title: "Monitoring & Risk Evaluation",
        desc: "Establishing baseline telemetry and real-time dashboarding.",
        status: "Live",
        icon: <Eye size={20} />
    },
    {
        phase: "Phase 2",
        title: "Predictive Anomaly Detection",
        desc: "ML models to forecast AQI spikes 2 hours in advance.",
        status: "Beta",
        icon: <Brain size={20} />
    },
    {
        phase: "Phase 3",
        title: "Closed-Loop Optimization",
        desc: "Direct BMS integration for autonomous HVAC control.",
        status: "Q4 2024",
        icon: <Network size={20} />
    },
    {
        phase: "Phase 4",
        title: "Macro-Analytics",
        desc: "City-level data sharing and cross-facility benchmarking.",
        status: "2025",
        icon: <BarChart size={20} />
    }
  ];

  return (
    <section id="roadmap" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-display font-medium text-slate-900">Product Roadmap</h2>
                <p className="mt-4 text-xl text-slate-500">Phased deployment strategy for scalable intelligence.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step, idx) => (
                    <div key={idx} className={`p-6 rounded-lg border ${step.status === 'Live' ? 'bg-white border-emerald-200 shadow-md' : 'bg-slate-50 border-slate-200 opacity-80'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${step.status === 'Live' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                                {step.status}
                            </span>
                            <div className="text-slate-400">
                                {step.icon}
                            </div>
                        </div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{step.phase}</h4>
                        <h3 className="font-bold text-slate-900 text-lg mb-2">{step.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Roadmap;