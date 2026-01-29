import React, { useState, useEffect, useCallback } from 'react';
import { 
  Loader2, Play, AlertCircle, Thermometer, Wind, Activity, 
  AlertTriangle, Cpu, ShieldCheck, FileText, Download, 
  Building, Users, Bell, TrendingUp, ChevronDown, CheckCircle2 
} from 'lucide-react';
import { Site, Alert } from '../types';
import { GoogleGenAI } from "@google/genai";

// Channel Configurations (Obfuscated in UI, kept for logic)
const CHANNELS = {
  AQI: '3239969',
  ENV: '1264164'
};

const API_URLS = {
  AQI: `https://api.thingspeak.com/channels/${CHANNELS.AQI}/feeds/last.json`,
  ENV: `https://api.thingspeak.com/channels/${CHANNELS.ENV}/feeds/last.json`
};

// Enterprise Site Configuration
const SITES: Site[] = [
  { id: 'pdx-01', name: 'Portland Manufacturing Hub', location: 'Portland, OR', type: 'Industrial', status: 'Online' },
  { id: 'cairo-02', name: 'Cairo Logistics Center', location: 'Cairo, EG', type: 'Logistics', status: 'Online' },
  { id: 'dub-03', name: 'Dubai Tech HQ', location: 'Dubai, UAE', type: 'Corporate', status: 'Maintenance' }
];

// Regulatory Standards Configuration
const STANDARDS = {
  AQI: { limit: 100, label: 'ISO 14001 Limit', unit: 'Index' },
  TEMP: { limit: 35, label: 'OSHA Thermal Limit', unit: '°C' }
};

const Dashboard: React.FC = () => {
  // State
  const [selectedSite, setSelectedSite] = useState<Site>(SITES[0]);
  const [dataAQI, setDataAQI] = useState<any>(null);
  const [dataEnv, setDataEnv] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportSummary, setReportSummary] = useState<string | null>(null);
  
  // Mock fallback data generator with noise
  const generateMockData = (siteId: string) => {
    const baseAQI = siteId === 'cairo-02' ? 140 : (siteId === 'pdx-01' ? 45 : 20);
    const baseTemp = siteId === 'dub-03' ? 38 : 22;
    return {
      aqi: (baseAQI + Math.random() * 15 - 7).toFixed(1),
      filter: (45 + Math.random() * 5).toFixed(1),
      gradient: (0.7 + Math.random() * 0.4).toFixed(2),
      state: "1",
      temp: (baseTemp + Math.random() * 2).toFixed(1),
      humidity: (42 + Math.random() * 4).toFixed(1)
    };
  };

  const [currentMock, setCurrentMock] = useState(generateMockData(SITES[0].id));

  // Fetch Logic
  const fetchAllData = useCallback(async () => {
    // We only fetch real data for the "Portland" site (mapped to real hardware)
    // For others, we simulate to show multi-site capability
    if (selectedSite.id === 'pdx-01') {
        try {
            const [resAQI, resEnv] = await Promise.allSettled([
                fetch(API_URLS.AQI),
                fetch(API_URLS.ENV)
            ]);
            
            if (resAQI.status === 'fulfilled' && resAQI.value.ok) {
                const json = await resAQI.value.json();
                if (json !== -1) setDataAQI(json);
            }
            if (resEnv.status === 'fulfilled' && resEnv.value.ok) {
                const json = await resEnv.value.json();
                if (json !== -1) setDataEnv(json);
            }
        } catch (e) { console.error(e); }
    } else {
        // Refresh mock for other sites
        setCurrentMock(generateMockData(selectedSite.id));
        setDataAQI(null); // Clear real data to force mock usage
        setDataEnv(null);
    }
    setLastUpdated(new Date().toLocaleTimeString());
  }, [selectedSite]);

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 15000); 
    return () => { clearInterval(interval); };
  }, [fetchAllData]);

  // Robust Value Retrieval
  const getValue = (type: 'AQI' | 'ENV', field: number, key: keyof typeof currentMock): number => {
    // If selected site is Portland and we have real data, use it
    if (selectedSite.id === 'pdx-01') {
        if (type === 'AQI' && dataAQI) {
            const val = parseFloat(dataAQI[`field${field}`]);
            if (!isNaN(val)) return val;
        }
        if (type === 'ENV' && dataEnv) {
            const val = parseFloat(dataEnv[`field${field}`]);
            if (!isNaN(val)) return val;
        }
    }
    // Fallback to mock
    return parseFloat(currentMock[key]);
  };

  // Metric Calculations
  const aqiValue = getValue('AQI', 1, 'aqi');
  const tempValue = getValue('ENV', 1, 'temp');
  const humidityValue = getValue('ENV', 2, 'humidity');
  const filterHealth = 100 - getValue('AQI', 2, 'filter'); // Invert load for "Health"
  
  // Compliance Logic
  const getComplianceStatus = (val: number, limit: number) => {
    if (val > limit) return 'Non-Compliant';
    if (val > limit * 0.75) return 'At Risk';
    return 'Compliant';
  };

  const aqiStatus = getComplianceStatus(aqiValue, STANDARDS.AQI.limit);
  const tempStatus = getComplianceStatus(tempValue, STANDARDS.TEMP.limit);
  const overallCompliance = aqiStatus === 'Non-Compliant' || tempStatus === 'Non-Compliant' ? 'Non-Compliant' : (aqiStatus === 'At Risk' ? 'At Risk' : 'Compliant');

  // Dynamic Alert Generation
  useEffect(() => {
    const newAlerts: Alert[] = [];
    if (aqiStatus === 'Non-Compliant') {
        newAlerts.push({ id: 'a1', severity: 'Critical', message: `Air Quality Index exceeded ISO 14001 Standards (${Math.round(aqiValue)})`, timestamp: new Date().toLocaleTimeString(), metric: 'AQI' });
    } else if (aqiStatus === 'At Risk') {
        newAlerts.push({ id: 'a2', severity: 'Warning', message: `Air Quality approaching regulatory limit`, timestamp: new Date().toLocaleTimeString(), metric: 'AQI' });
    }
    if (tempStatus === 'Non-Compliant') {
        newAlerts.push({ id: 'a3', severity: 'Critical', message: `Thermal limit exceeded in Zone 1 (Workforce Safety Risk)`, timestamp: new Date().toLocaleTimeString(), metric: 'TEMP' });
    }
    
    // Simulate a system alert occasionally
    if (filterHealth < 20) {
        newAlerts.push({ id: 'a4', severity: 'Warning', message: 'Filtration efficiency < 20% - Schedule Maintenance', timestamp: new Date().toLocaleTimeString(), metric: 'MAINT' });
    }

    setAlerts(newAlerts);
  }, [aqiStatus, tempStatus, filterHealth, aqiValue]);

  // AI Insights
  const generateAuditReport = async () => {
    setIsGeneratingReport(true);
    setReportSummary(null);
    try {
        const prompt = `
            Act as a Senior Industrial Safety Officer. Analyze this facility telemetry data for site "${selectedSite.name}" (${selectedSite.type}).
            
            Telemetry:
            - Air Quality Index: ${aqiValue} (Threshold: ${STANDARDS.AQI.limit})
            - Thermal: ${tempValue}°C (Threshold: ${STANDARDS.TEMP.limit})
            - Humidity: ${humidityValue}%
            - Filter Efficiency: ${filterHealth}%
            
            Global Compliance Status: ${overallCompliance}

            Generate a "Daily Risk Assessment" (max 80 words).
            DO NOT mention specific sensor models.
            DO mention: "Estimated productivity impact", "Regulatory liability", and one specific "Mitigation Action".
            Tone: Executive, succinct.
        `;

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });

        setReportSummary(response.text || "Report generation failed.");
    } catch (e) {
        setReportSummary("Automated analysis unavailable. Manual review required.");
    } finally {
        setIsGeneratingReport(false);
    }
  };

  // Helper colors
  const getStatusColor = (status: string, bg = false) => {
    switch (status) {
        case 'Non-Compliant': return bg ? 'bg-rose-50 border-rose-200' : 'text-rose-600';
        case 'At Risk': return bg ? 'bg-amber-50 border-amber-200' : 'text-amber-600';
        default: return bg ? 'bg-emerald-50 border-emerald-200' : 'text-emerald-600';
    }
  };

  return (
    <section id="dashboard" className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ENTERPRISE HEADER */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 mb-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="bg-slate-900 text-white p-2 rounded">
                    <Building size={20} />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Facility Selector</label>
                    <div className="relative group">
                        <select 
                            className="appearance-none bg-transparent font-display font-bold text-xl text-slate-900 pr-8 cursor-pointer focus:outline-none"
                            value={selectedSite.id}
                            onChange={(e) => setSelectedSite(SITES.find(s => s.id === e.target.value) || SITES[0])}
                        >
                            {SITES.map(site => <option key={site.id} value={site.id}>{site.name}</option>)}
                        </select>
                        <ChevronDown size={16} className="absolute right-0 top-1.5 text-slate-400 pointer-events-none" />
                    </div>
                </div>
                <span className={`ml-2 px-2 py-0.5 text-xs font-bold rounded uppercase ${selectedSite.status === 'Online' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {selectedSite.status}
                </span>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto justify-end">
                <div className="text-right hidden sm:block">
                    <span className="block text-xs text-slate-400 font-bold uppercase">Role: Site Admin</span>
                    <span className="block text-sm font-bold text-slate-900 flex items-center gap-2 justify-end">
                        <Users size={14} /> Global View
                    </span>
                </div>
                <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                <button 
                    onClick={generateAuditReport}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded hover:bg-slate-800 transition-colors shadow-md"
                >
                    {isGeneratingReport ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
                    <span>Generate Assessment</span>
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT COLUMN: COMPLIANCE & METRICS (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
                
                {/* 1. COMPLIANCE STATUS BANNER */}
                <div className={`rounded-lg border-l-4 p-6 shadow-sm bg-white flex flex-col md:flex-row justify-between items-center gap-6 ${getStatusColor(overallCompliance, true)} ${overallCompliance === 'Non-Compliant' ? 'border-l-rose-500' : overallCompliance === 'At Risk' ? 'border-l-amber-500' : 'border-l-emerald-500'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${overallCompliance === 'Non-Compliant' ? 'bg-rose-100 text-rose-600' : overallCompliance === 'At Risk' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                            <ShieldCheck size={32} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Facility Compliance Status</h2>
                            <p className="text-sm text-slate-600">
                                Current adherence to environmental protocols.
                                <span className="font-mono ml-2 opacity-60">Synced: {lastUpdated}</span>
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`text-3xl font-display font-bold ${getStatusColor(overallCompliance)}`}>
                            {overallCompliance.toUpperCase()}
                        </div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                            ISO 14001 / OSHA STANDARDS
                        </div>
                    </div>
                </div>

                {/* 2. REGULATORY THRESHOLDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* AQI CARD */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                                    <Wind size={16} /> Air Quality Index
                                </h3>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-4xl font-mono font-bold text-slate-900">{Math.round(aqiValue)}</span>
                                    <span className="text-sm text-slate-400 font-medium">/ {STANDARDS.AQI.limit} Max</span>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getStatusColor(aqiStatus, true)}`}>
                                {aqiStatus}
                            </span>
                        </div>
                        {/* Threshold Bar */}
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ${aqiValue > 100 ? 'bg-rose-500' : aqiValue > 75 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                                style={{ width: `${Math.min((aqiValue / 150) * 100, 100)}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                            <span>Optimal</span>
                            <span>{STANDARDS.AQI.limit} (Limit)</span>
                            <span>Hazardous</span>
                        </div>
                    </div>

                    {/* THERMAL CARD */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                                    <Thermometer size={16} /> Thermal Conditions
                                </h3>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-4xl font-mono font-bold text-slate-900">{tempValue}°C</span>
                                    <span className="text-sm text-slate-400 font-medium">/ {STANDARDS.TEMP.limit}°C Max</span>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getStatusColor(tempStatus, true)}`}>
                                {tempStatus}
                            </span>
                        </div>
                        {/* Threshold Bar */}
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ${tempValue > 35 ? 'bg-rose-500' : tempValue > 30 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                                style={{ width: `${Math.min((tempValue / 50) * 100, 100)}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                            <span>Low</span>
                            <span>{STANDARDS.TEMP.limit}°C (Warning)</span>
                            <span>Critical</span>
                        </div>
                    </div>
                </div>

                {/* 3. HISTORICAL TRENDS (Mocked Chart UI) */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                         <h3 className="text-sm font-bold text-slate-900 uppercase flex items-center gap-2">
                            <TrendingUp size={16} className="text-slate-400" /> 24H Compliance Trend
                        </h3>
                        <div className="flex gap-2">
                            <button className="text-xs font-bold text-white bg-slate-900 px-3 py-1 rounded">24H</button>
                            <button className="text-xs font-bold text-slate-500 hover:bg-slate-100 px-3 py-1 rounded">7D</button>
                            <button className="text-xs font-bold text-slate-500 hover:bg-slate-100 px-3 py-1 rounded">30D</button>
                        </div>
                    </div>
                    {/* Visual Placeholder for Chart */}
                    <div className="h-64 w-full bg-slate-50 rounded border border-slate-100 relative overflow-hidden flex items-end px-4 pt-4 gap-1">
                        {/* Generating fake bars */}
                        {Array.from({ length: 24 }).map((_, i) => {
                            const height = 20 + Math.random() * 60;
                            const isHigh = height > 70;
                            return (
                                <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer relative">
                                    <div 
                                        className={`w-full rounded-t ${isHigh ? 'bg-rose-400' : 'bg-emerald-400'} opacity-80 group-hover:opacity-100 transition-all`}
                                        style={{ height: `${height}%` }}
                                    ></div>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-slate-900 text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                                        {Math.round(height)}
                                    </div>
                                </div>
                            );
                        })}
                        {/* Threshold Line */}
                        <div className="absolute top-[30%] left-0 w-full border-t-2 border-dashed border-rose-300 pointer-events-none">
                            <span className="absolute right-2 -top-3 text-[10px] font-bold text-rose-500 bg-white px-1">Limit (100)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: ACTIONABLE INSIGHTS (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* 1. AI EXECUTIVE SUMMARY */}
                <div className="bg-slate-900 text-white rounded-lg p-6 shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Cpu size={120} />
                    </div>
                    <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Activity size={14} /> Intelligence Engine
                    </h3>
                    
                    {reportSummary ? (
                        <div className="animate-fade-in">
                            <p className="text-sm text-slate-300 leading-relaxed font-light mb-4 border-l-2 border-emerald-500 pl-3">
                                {reportSummary}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-emerald-400">
                                <CheckCircle2 size={12} />
                                <span>Analysis Complete</span>
                            </div>
                        </div>
                    ) : (
                         <div className="text-center py-6">
                            <p className="text-sm text-slate-400 mb-4">
                                Run predictive risk analysis on current telemetry.
                            </p>
                            <button 
                                onClick={generateAuditReport}
                                disabled={isGeneratingReport}
                                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium text-sm transition-colors flex items-center justify-center gap-2"
                            >
                                {isGeneratingReport ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
                                Execute Risk Analysis
                            </button>
                        </div>
                    )}
                </div>

                {/* 2. ACTIVE ALERTS FEED */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[300px]">
                    <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-700 uppercase flex items-center gap-2">
                            <Bell size={16} className="text-slate-400" /> Active Risks
                        </h3>
                        <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">{alerts.length}</span>
                    </div>
                    <div className="overflow-y-auto p-0">
                        {alerts.length === 0 ? (
                             <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                                <ShieldCheck size={32} className="mb-2 text-slate-300" />
                                <span className="text-xs uppercase font-bold tracking-wide">Facility Nominal</span>
                             </div>
                        ) : (
                            alerts.map((alert) => (
                                <div key={alert.id} className="p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors flex gap-3">
                                    <div className={`mt-1 ${alert.severity === 'Critical' ? 'text-rose-500' : 'text-amber-500'}`}>
                                        <AlertTriangle size={16} />
                                    </div>
                                    <div>
                                        <p className={`text-xs font-bold uppercase mb-1 ${alert.severity === 'Critical' ? 'text-rose-600' : 'text-amber-600'}`}>
                                            {alert.severity} • {alert.metric}
                                        </p>
                                        <p className="text-sm text-slate-700 font-medium leading-tight mb-1">{alert.message}</p>
                                        <p className="text-[10px] text-slate-400 font-mono">{alert.timestamp}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* 3. QUICK ACTIONS / EXPORT */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Compliance Tools</h3>
                    <div className="space-y-2">
                        <button className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 text-sm text-slate-700 transition-colors group">
                            <span className="flex items-center gap-2"><FileText size={16} className="text-slate-400 group-hover:text-blue-500"/> Export CSV Logs</span>
                            <Download size={14} className="text-slate-300" />
                        </button>
                        <button className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 text-sm text-slate-700 transition-colors group">
                            <span className="flex items-center gap-2"><AlertCircle size={16} className="text-slate-400 group-hover:text-rose-500"/> Audit Report (PDF)</span>
                            <Download size={14} className="text-slate-300" />
                        </button>
                    </div>
                </div>

            </div>

        </div>
      </div>
    </section>
  );
};

export default Dashboard;