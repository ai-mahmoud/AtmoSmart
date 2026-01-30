import React, { useState, useEffect } from 'react';
import { Activity, GitMerge, ArrowRight, Zap, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';

const DigitalTwin: React.FC = () => {
  const [syncTime, setSyncTime] = useState(0);
  const [inputs, setInputs] = useState({
    pm25: 42,
    voc: 120,
    temp: 24,
    occupancy: 85
  });
  
  const [modelState, setModelState] = useState({
    riskScore: 0.15,
    hvacMode: 'Eco',
    filtrationLoad: 35
  });

  const [simulation, setSimulation] = useState<{
    active: boolean;
    type: string | null;
    counter: number;
  }>({ active: false, type: null, counter: 0 });

  // Continuous State Synchronization (The "Twin" aspect)
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncTime(Date.now());
      
      if (!simulation.active) {
        // Normal random fluctuation (The "Live" data)
        setInputs(prev => ({
          pm25: Math.max(20, Math.min(60, prev.pm25 + (Math.random() - 0.5) * 5)),
          voc: Math.max(100, Math.min(150, prev.voc + (Math.random() - 0.5) * 10)),
          temp: 24 + (Math.random() - 0.5) * 0.5,
          occupancy: 85 + Math.floor((Math.random() - 0.5) * 2)
        }));
        setModelState({
            riskScore: 0.15 + (Math.random() * 0.05),
            hvacMode: 'Eco',
            filtrationLoad: 35
        });
      } else {
        // Simulation Logic
        // Scenario: Sudden Dust Event
        const peak = 180;
        const currentPM = inputs.pm25 + (peak - inputs.pm25) * 0.2; // Approach peak
        
        setInputs(prev => ({ ...prev, pm25: currentPM }));
        
        // The Model Reaction (Logic)
        const newLoad = Math.min(100, 35 + (currentPM - 50) * 1.5);
        setModelState({
            riskScore: currentPM > 100 ? 0.85 : 0.4,
            hvacMode: newLoad > 80 ? 'Max' : 'High',
            filtrationLoad: newLoad
        });
        
        if (simulation.counter > 20) {
            setSimulation({ active: false, type: null, counter: 0 }); // Reset
        } else {
            setSimulation(prev => ({ ...prev, counter: prev.counter + 1 }));
        }
      }
    }, 1000); // 1Hz update

    return () => clearInterval(interval);
  }, [simulation, inputs.pm25]);

  const runSimulation = () => {
    setSimulation({ active: true, type: 'SPIKE', counter: 0 });
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-700 p-6 md:p-8 text-slate-200 font-mono text-sm shadow-2xl overflow-hidden relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
            <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
                <h3 className="text-emerald-400 font-bold uppercase tracking-widest">Digital Twin Active State</h3>
            </div>
            <div className="text-xs text-slate-500">
                SYNC_ID: {syncTime} // LATENCY: 12ms
            </div>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* COLUMN 1: LIVE TELEMETRY INPUTS */}
            <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">
                    <Activity size={14} /> Physical Inputs (Sensors)
                </h4>
                
                <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                    <div className="flex justify-between mb-1">
                        <span className="text-slate-400">PM2.5 Conc.</span>
                        <span className={`font-bold ${inputs.pm25 > 100 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {inputs.pm25.toFixed(1)} µg/m³
                        </span>
                    </div>
                    <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-500 ${inputs.pm25 > 100 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, (inputs.pm25/200)*100)}%` }}></div>
                    </div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                    <div className="flex justify-between mb-1">
                        <span className="text-slate-400">VOC Level</span>
                        <span className="text-blue-400">{inputs.voc.toFixed(0)} ppb</span>
                    </div>
                    <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${(inputs.voc/500)*100}%` }}></div>
                    </div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                    <div className="flex justify-between mb-1">
                        <span className="text-slate-400">Zone Occupancy</span>
                        <span className="text-amber-400">{inputs.occupancy.toFixed(0)} ppl</span>
                    </div>
                    <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${inputs.occupancy}%` }}></div>
                    </div>
                </div>
            </div>

            {/* COLUMN 2: ANALYTICAL MODEL */}
            <div className="relative">
                <div className="absolute top-1/2 -left-4 -translate-y-1/2 text-slate-600 hidden lg:block">
                    <ArrowRight size={24} />
                </div>
                <div className="absolute top-1/2 -right-4 -translate-y-1/2 text-slate-600 hidden lg:block">
                    <ArrowRight size={24} />
                </div>

                <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">
                    <GitMerge size={14} /> Logical State Model
                </h4>

                <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 h-[240px] flex flex-col justify-center relative">
                    {/* The "Math" visualization */}
                    <div className="absolute top-2 right-2 text-[10px] text-slate-500">v2.4.1-stable</div>
                    
                    <div className="space-y-4">
                         <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                            <span className="text-slate-400 text-xs">CALCULATED RISK RISK_SCORE</span>
                            <span className={`font-bold font-mono ${modelState.riskScore > 0.5 ? 'text-rose-500' : 'text-emerald-500'}`}>
                                {modelState.riskScore.toFixed(3)}
                            </span>
                         </div>
                         
                         <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                            <span className="text-slate-400 text-xs">OPTIMAL_FILTRATION_RATE</span>
                            <span className="font-bold font-mono text-blue-400">
                                {modelState.filtrationLoad.toFixed(1)}%
                            </span>
                         </div>

                         <div className="p-2 bg-slate-900/50 rounded text-[10px] text-slate-400 font-mono">
                            fn(risk) = (PM2.5 * w1) + (VOC * w2) + (Occ * w3)
                         </div>
                    </div>
                </div>

                {/* Simulation Trigger */}
                <button 
                    onClick={runSimulation}
                    disabled={simulation.active}
                    className="mt-4 w-full py-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white rounded flex items-center justify-center gap-2 transition-colors border border-slate-600 group"
                >
                    {simulation.active ? (
                        <RefreshCw className="animate-spin text-emerald-400" size={16} />
                    ) : (
                        <AlertTriangle className="text-amber-400 group-hover:text-amber-300" size={16} />
                    )}
                    <span className="font-bold text-xs uppercase">
                        {simulation.active ? 'Running Scenario...' : 'Test Risk Scenario'}
                    </span>
                </button>
            </div>

            {/* COLUMN 3: PREDICTIVE OUTPUTS */}
            <div className="space-y-4">
                 <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">
                    <Zap size={14} /> Decision Support (Output)
                </h4>

                <div className={`p-4 rounded border transition-colors duration-500 ${modelState.riskScore > 0.6 ? 'bg-rose-900/20 border-rose-800' : 'bg-emerald-900/20 border-emerald-800'}`}>
                    <div className="flex items-start gap-3">
                        {modelState.riskScore > 0.6 ? (
                             <AlertTriangle size={20} className="text-rose-500 shrink-0" />
                        ) : (
                             <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                        )}
                        <div>
                            <h5 className={`text-sm font-bold mb-1 ${modelState.riskScore > 0.6 ? 'text-rose-400' : 'text-emerald-400'}`}>
                                {modelState.riskScore > 0.6 ? 'Mitigation Triggered' : 'System Nominal'}
                            </h5>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                {modelState.riskScore > 0.6 
                                    ? `Predictive model initiated HVAC boost to ${modelState.filtrationLoad.toFixed(0)}% capacity to counteract detected particulate spike.`
                                    : "Predictive model forecasts compliance for next 4 hours based on current trends."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Simulated Future Graph Bar */}
                <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                    <div className="flex justify-between mb-2">
                        <span className="text-xs text-slate-400">Forecasted Energy Impact</span>
                        <span className="text-xs font-bold text-white">{modelState.filtrationLoad > 50 ? '+2.4 kWh' : '+0.8 kWh'}</span>
                    </div>
                    <div className="flex items-end gap-1 h-12">
                        {[30, 32, 35, 30, 28, 35, 40, modelState.filtrationLoad, modelState.filtrationLoad * 0.9, modelState.filtrationLoad * 0.8].map((h, i) => (
                            <div key={i} className={`flex-1 rounded-t transition-all duration-500 ${i > 6 ? 'opacity-50' : ''} ${h > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
      </div>
    </div>
  );
};

export default DigitalTwin;