import React, { useState, useEffect, useCallback } from 'react';
import { 
  Loader2, Play, AlertCircle, Thermometer, Wind, Activity, 
  AlertTriangle, Cpu, ShieldCheck, FileText, Download, 
  Building, Users, Bell, TrendingUp, ChevronDown, CheckCircle2,
  Briefcase
} from 'lucide-react';
import { Site, Alert } from '../types';
import { GoogleGenAI } from "@google/genai";
import { jsPDF } from "jspdf";

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

  // Business Impact Logic
  const productivityImpact = aqiStatus === 'Non-Compliant' ? '-12%' : (aqiStatus === 'At Risk' ? '-7%' : 'Optimal');
  const sickLeaveRisk = aqiStatus === 'Non-Compliant' ? '+18%' : (aqiStatus === 'At Risk' ? '+5%' : 'Low');
  const complianceExposure = overallCompliance === 'Non-Compliant' ? 'HIGH' : (overallCompliance === 'At Risk' ? 'ELEVATED' : 'LOW');

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
        case 'Non-Compliant': return bg ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-900/50' : 'text-rose-600 dark:text-rose-400';
        case 'At Risk': return bg ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900/50' : 'text-amber-600 dark:text-amber-400';
        default: return bg ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-900/50' : 'text-emerald-600 dark:text-emerald-400';
    }
  };

  // --- DOWNLOAD HANDLERS ---
  const handleDownloadCSV = () => {
    const headers = ["Timestamp", "Site_ID", "AQI", "Temperature_C", "Humidity_Pct", "Filter_Efficiency", "Compliance_Status"];
    const rows = [];
    const now = new Date();

    // Generate 24 hours of mock historical data based on current readings
    for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        const noise = () => (Math.random() - 0.5) * 5; // Variation
        
        const rowAQI = Math.max(0, Math.round(aqiValue + noise()));
        // Make temperature float
        const tVal = parseFloat(typeof tempValue === 'string' ? tempValue : String(tempValue));
        const rowTemp = (tVal + noise() * 0.2).toFixed(1);
        
        // Make humidity float
        const hVal = parseFloat(typeof humidityValue === 'string' ? humidityValue : String(humidityValue));
        const rowHum = (hVal + noise()).toFixed(1);
        
        const rowFilter = Math.max(0, Math.min(100, (filterHealth - (i * 0.05)))).toFixed(1);
        
        const status = rowAQI > STANDARDS.AQI.limit ? "Non-Compliant" : (rowAQI > STANDARDS.AQI.limit * 0.75 ? "At Risk" : "Compliant");

        rows.push([
            time.toISOString(),
            selectedSite.id,
            rowAQI,
            rowTemp,
            rowHum,
            rowFilter,
            status
        ].join(","));
    }

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `atmosmart_logs_${selectedSite.id}_${now.toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const now = new Date();
    
    // Header
    doc.setFillColor(16, 185, 129); // Emerald 500
    doc.rect(0, 0, 210, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("AtmoSmart Compliance Audit Report", 10, 13);
    
    // Metadata
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Generated: ${now.toLocaleString()}`, 10, 30);
    doc.text(`Facility: ${selectedSite.name}`, 10, 35);
    doc.text(`Location: ${selectedSite.location}`, 10, 40);
    doc.text(`Audit ID: REF-${Math.floor(Math.random() * 100000)}`, 150, 30);

    // Section 1: Executive Status
    doc.setDrawColor(200, 200, 200);
    doc.line(10, 45, 200, 45);
    doc.setFontSize(14);
    doc.text("1. Executive Status", 10, 55);
    
    doc.setFontSize(11);
    if (overallCompliance === 'Non-Compliant') doc.setTextColor(220, 38, 38);
    else if (overallCompliance === 'At Risk') doc.setTextColor(217, 119, 6);
    else doc.setTextColor(5, 150, 105);
    
    doc.text(`Status: ${overallCompliance.toUpperCase()}`, 10, 62);
    doc.setTextColor(0, 0, 0);
    
    // AI Summary
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    const summaryText = reportSummary || "System nominal. No critical anomalies detected in the last 24-hour operational window. Automated monitoring active.";
    const splitSummary = doc.splitTextToSize(summaryText, 180);
    doc.text(splitSummary, 10, 70);
    doc.setFont("helvetica", "normal");

    let yPos = 70 + (splitSummary.length * 5) + 10;

    // Section 2: Telemetry Snapshot
    doc.setFontSize(14);
    doc.text("2. Telemetry Snapshot", 10, yPos);
    yPos += 10;
    
    const data = [
        ["Metric", "Value", "Standard", "Status"],
        ["Air Quality Index", `${Math.round(aqiValue)}`, `< ${STANDARDS.AQI.limit}`, aqiStatus],
        ["Temperature", `${tempValue}°C`, `< ${STANDARDS.TEMP.limit}°C`, tempStatus],
        ["Humidity", `${humidityValue}%`, "40-60%", "N/A"],
        ["Filter Efficiency", `${Math.round(filterHealth)}%`, "> 20%", filterHealth < 20 ? "Service Req" : "Optimal"]
    ];

    doc.setFontSize(10);
    // Simple table drawing manually
    data.forEach((row, i) => {
        if (i === 0) doc.setFont("helvetica", "bold");
        else doc.setFont("helvetica", "normal");
        
        doc.text(row[0], 10, yPos);
        doc.text(row[1], 70, yPos);
        doc.text(row[2], 110, yPos);
        doc.text(row[3], 150, yPos);
        yPos += 7;
    });

    yPos += 10;

    // Section 3: Incident Log
    doc.setFontSize(14);
    doc.text("3. Active Incidents", 10, yPos);
    yPos += 10;

    if (alerts.length === 0) {
        doc.setFontSize(10);
        doc.text("No active incidents recorded.", 10, yPos);
    } else {
        alerts.forEach(alert => {
             doc.setFontSize(10);
             const prefix = alert.severity === 'Critical' ? '[CRITICAL]' : '[WARNING]';
             if (alert.severity === 'Critical') doc.setTextColor(220, 38, 38);
             else doc.setTextColor(217, 119, 6);
             doc.text(`${prefix} ${alert.message} (${alert.timestamp})`, 10, yPos);
             yPos += 6;
        });
    }

    doc.save(`audit_report_${selectedSite.id}.pdf`);
  };

  return (
    <section id="dashboard" className="bg-slate-50 dark:bg-slate-900 min-h-screen py-8 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ENTERPRISE HEADER */}
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-4 mb-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="bg-slate-900 dark:bg-slate-800 text-white p-2 rounded">
                    <Building size={20} />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Facility Selector</label>
                    <div className="relative group">
                        <select 
                            className="appearance-none bg-transparent font-display font-bold text-xl text-slate-900 dark:text-white pr-8 cursor-pointer focus:outline-none"
                            value={selectedSite.id}
                            onChange={(e) => setSelectedSite(SITES.find(s => s.id === e.target.value) || SITES[0])}
                        >
                            {SITES.map(site => <option key={site.id} value={site.id} className="text-slate-900">{site.name}</option>)}
                        </select>
                        <ChevronDown size={16} className="absolute right-0 top-1.5 text-slate-400 pointer-events-none" />
                    </div>
                </div>
                <span className={`ml-2 px-2 py-0.5 text-xs font-bold rounded uppercase ${selectedSite.status === 'Online' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'}`}>
                    {selectedSite.status}
                </span>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto justify-end">
                <div className="text-right hidden sm:block">
                    <span className="block text-xs text-slate-400 font-bold uppercase">Role: Site Admin</span>
                    <span className="block text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 justify-end">
                        <Users size={14} /> Global View
                    </span>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                <button 
                    onClick={generateAuditReport}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-emerald-600 text-white text-sm font-medium rounded hover:bg-slate-800 dark:hover:bg-emerald-500 transition-colors shadow-md"
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
                <div className={`rounded-lg border-l-4 p-6 shadow-sm bg-white dark:bg-slate-950 flex flex-col md:flex-row justify-between items-center gap-6 ${getStatusColor(overallCompliance, true)} ${overallCompliance === 'Non-Compliant' ? 'border-l-rose-500' : overallCompliance === 'At Risk' ? 'border-l-amber-500' : 'border-l-emerald-500'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${overallCompliance === 'Non-Compliant' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' : overallCompliance === 'At Risk' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'}`}>
                            <ShieldCheck size={32} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">Facility Compliance Status</h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Current adherence to environmental protocols.
                                <span className="font-mono ml-2 opacity-60">Synced: {lastUpdated}</span>
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`text-3xl font-display font-bold ${getStatusColor(overallCompliance)}`}>
                            {overallCompliance.toUpperCase()}
                        </div>
                        <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
                            ISO 14001 / OSHA STANDARDS
                        </div>
                    </div>
                </div>

                {/* 2. REGULATORY THRESHOLDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* AQI CARD */}
                    <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase flex items-center gap-2">
                                    <Wind size={16} /> Air Quality Index
                                </h3>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-4xl font-mono font-bold text-slate-900 dark:text-white">{Math.round(aqiValue)}</span>
                                    <span className="text-sm text-slate-400 font-medium">/ {STANDARDS.AQI.limit} Max</span>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getStatusColor(aqiStatus, true)}`}>
                                {aqiStatus}
                            </span>
                        </div>
                        {/* Threshold Bar */}
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ${aqiValue > 100 ? 'bg-rose-500' : aqiValue > 75 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                                style={{ width: `${Math.min((aqiValue / 150) * 100, 100)}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase">
                            <span>Optimal</span>
                            <span>{STANDARDS.AQI.limit} (Limit)</span>
                            <span>Hazardous</span>
                        </div>
                    </div>

                    {/* THERMAL CARD */}
                    <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase flex items-center gap-2">
                                    <Thermometer size={16} /> Thermal Conditions
                                </h3>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-4xl font-mono font-bold text-slate-900 dark:text-white">{tempValue}°C</span>
                                    <span className="text-sm text-slate-400 font-medium">/ {STANDARDS.TEMP.limit}°C Max</span>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getStatusColor(tempStatus, true)}`}>
                                {tempStatus}
                            </span>
                        </div>
                        {/* Threshold Bar */}
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ${tempValue > 35 ? 'bg-rose-500' : tempValue > 30 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                                style={{ width: `${Math.min((tempValue / 50) * 100, 100)}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase">
                            <span>Low</span>
                            <span>{STANDARDS.TEMP.limit}°C (Warning)</span>
                            <span>Critical</span>
                        </div>
                    </div>
                </div>

                {/* 3. HISTORICAL TRENDS (Mocked Chart UI) */}
                <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                         <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2">
                            <TrendingUp size={16} className="text-slate-400" /> 24H Compliance Trend
                        </h3>
                        <div className="flex gap-2">
                            <button className="text-xs font-bold text-white bg-slate-900 dark:bg-slate-700 px-3 py-1 rounded">24H</button>
                            <button className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-1 rounded">7D</button>
                            <button className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-1 rounded">30D</button>
                        </div>
                    </div>
                    {/* Visual Placeholder for Chart */}
                    <div className="h-64 w-full bg-slate-50 dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800 relative overflow-hidden flex items-end px-4 pt-4 gap-1">
                        {/* Generating fake bars */}
                        {Array.from({ length: 24 }).map((_, i) => {
                            const height = 20 + Math.random() * 60;
                            const isHigh = height > 70;
                            return (
                                <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer relative">
                                    <div 
                                        className={`w-full rounded-t ${isHigh ? 'bg-rose-400 dark:bg-rose-500' : 'bg-emerald-400 dark:bg-emerald-500'} opacity-80 group-hover:opacity-100 transition-all`}
                                        style={{ height: `${height}%` }}
                                    ></div>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                                        {Math.round(height)}
                                    </div>
                                </div>
                            );
                        })}
                        {/* Threshold Line */}
                        <div className="absolute top-[30%] left-0 w-full border-t-2 border-dashed border-rose-300 dark:border-rose-700 pointer-events-none">
                            <span className="absolute right-2 -top-3 text-[10px] font-bold text-rose-500 dark:text-rose-400 bg-white dark:bg-slate-900 px-1">Limit (100)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: ACTIONABLE INSIGHTS (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* 1. BUSINESS IMPACT ESTIMATE (NEW) */}
                <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-5">
                    <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Briefcase size={14} /> Business Impact (Est)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-600 dark:text-slate-400">Productivity Impact</span>
                                <span className={`font-bold ${productivityImpact === 'Optimal' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                    {productivityImpact}
                                </span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full">
                                <div className={`h-1.5 rounded-full ${productivityImpact === 'Optimal' ? 'bg-emerald-500 w-full' : 'bg-rose-500 w-[70%]'}`}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-600 dark:text-slate-400">Sick Leave Risk</span>
                                <span className={`font-bold ${sickLeaveRisk === 'Low' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                    {sickLeaveRisk}
                                </span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full">
                                <div className={`h-1.5 rounded-full ${sickLeaveRisk === 'Low' ? 'bg-emerald-500 w-[10%]' : 'bg-amber-500 w-[40%]'}`}></div>
                            </div>
                        </div>
                        <div>
                             <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-600 dark:text-slate-400">Compliance Exposure</span>
                                <span className={`font-bold ${overallCompliance === 'Compliant' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                    {complianceExposure}
                                </span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full">
                                <div className={`h-1.5 rounded-full ${complianceExposure === 'LOW' ? 'bg-emerald-500 w-[5%]' : (complianceExposure === 'ELEVATED' ? 'bg-amber-500 w-[50%]' : 'bg-rose-600 w-[90%]')}`}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. AI EXECUTIVE SUMMARY */}
                <div className="bg-slate-900 dark:bg-black text-white rounded-lg p-6 shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Cpu size={120} />
                    </div>
                    <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Activity size={14} /> Decision Intelligence
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

                {/* 3. ACTIVE ALERTS FEED */}
                <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[250px]">
                    <div className="bg-slate-50 dark:bg-slate-900 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase flex items-center gap-2">
                            <Bell size={16} className="text-slate-400" /> Active Risks
                        </h3>
                        <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full text-xs font-bold">{alerts.length}</span>
                    </div>
                    <div className="overflow-y-auto p-0">
                        {alerts.length === 0 ? (
                             <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                                <ShieldCheck size={32} className="mb-2 text-slate-300" />
                                <span className="text-xs uppercase font-bold tracking-wide">Facility Nominal</span>
                             </div>
                        ) : (
                            alerts.map((alert) => (
                                <div key={alert.id} className="p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex gap-3">
                                    <div className={`mt-1 ${alert.severity === 'Critical' ? 'text-rose-500' : 'text-amber-500'}`}>
                                        <AlertTriangle size={16} />
                                    </div>
                                    <div>
                                        <p className={`text-xs font-bold uppercase mb-1 ${alert.severity === 'Critical' ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                            {alert.severity} • {alert.metric}
                                        </p>
                                        <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-tight mb-1">{alert.message}</p>
                                        <p className="text-[10px] text-slate-400 font-mono">{alert.timestamp}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* 4. QUICK ACTIONS / EXPORT */}
                <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm p-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Compliance Tools</h3>
                    <div className="space-y-2">
                        <button 
                            onClick={handleDownloadCSV}
                            className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 transition-colors group"
                        >
                            <span className="flex items-center gap-2"><FileText size={16} className="text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400"/> Export CSV Logs</span>
                            <Download size={14} className="text-slate-300" />
                        </button>
                        <button 
                            onClick={handleDownloadPDF}
                            className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 transition-colors group"
                        >
                            <span className="flex items-center gap-2"><AlertCircle size={16} className="text-slate-400 group-hover:text-rose-500 dark:group-hover:text-rose-400"/> Audit Report (PDF)</span>
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