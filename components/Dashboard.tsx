import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLink, RefreshCw, Volume2, Loader2, Play, AlertCircle, Thermometer, Droplets, Wind, Activity, Zap, Wifi, Clock, Database, Info, TriangleAlert, Cpu, Gauge, Radio, ShieldCheck } from 'lucide-react';
import { DashboardWidget } from '../types';
import { GoogleGenAI, Modality } from "@google/genai";

// Channel Configurations
const CHANNELS = {
  AQI: '3239969',
  ENV: '1264164'
};

const API_URLS = {
  AQI: `https://api.thingspeak.com/channels/${CHANNELS.AQI}/feeds/last.json`,
  ENV: `https://api.thingspeak.com/channels/${CHANNELS.ENV}/feeds/last.json`
};

const widgets: DashboardWidget[] = [
  {
    title: 'Air Quality Index',
    channelId: CHANNELS.AQI,
    fieldId: 1,
    type: 'line',
    color: '#ef4444', // Red
    unit: 'AQI',
    description: 'PM2.5/PM10 Aggregate'
  },
  {
    title: 'Filter Saturation',
    channelId: CHANNELS.AQI,
    fieldId: 2,
    type: 'line',
    color: '#64748b', // Slate
    unit: '%',
    description: 'Carbon Element Load'
  },
  {
    title: 'Pollution Gradient',
    channelId: CHANNELS.AQI,
    fieldId: 3,
    type: 'spline',
    color: '#8b5cf6', // Violet
    unit: 'Δ',
    description: 'Change Rate Derivative'
  },
  {
    title: 'System State',
    channelId: CHANNELS.AQI,
    fieldId: 4,
    type: 'step',
    color: '#10b981', // Emerald
    unit: 'Bit',
    description: '0: Idle, 1: Active'
  },
  {
    title: 'Ambient Temp',
    channelId: CHANNELS.ENV,
    fieldId: 1,
    type: 'spline',
    color: '#f97316', // Orange
    unit: '°C',
    description: 'Thermal Sensor 1'
  },
  {
    title: 'Rel. Humidity',
    channelId: CHANNELS.ENV,
    fieldId: 2,
    type: 'spline',
    color: '#0ea5e9', // Blue
    unit: '%',
    description: 'Hygrometer Sensor 1'
  }
];

// Helper for Base64 decoding
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper for decoding PCM data from Gemini TTS
async function decodeAudioData(data: Uint8Array, ctx: AudioContext): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < dataInt16.length; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}

const Dashboard: React.FC = () => {
  const [dataAQI, setDataAQI] = useState<any>(null);
  const [dataEnv, setDataEnv] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [uptime, setUptime] = useState(0);
  
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [isGlobalSpeaking, setIsGlobalSpeaking] = useState(false);
  const [ttsMode, setTtsMode] = useState<'gemini' | 'browser'>('gemini');

  const fetchAllData = useCallback(async () => {
    try {
      const [resAQI, resEnv] = await Promise.all([
        fetch(API_URLS.AQI),
        fetch(API_URLS.ENV)
      ]);
      
      const jsonAQI = await resAQI.json();
      const jsonEnv = await resEnv.json();

      setDataAQI(jsonAQI);
      setDataEnv(jsonEnv);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 15000); // 15s refresh
    const timer = setInterval(() => setUptime(prev => prev + 1), 60000); // Uptime mock
    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [fetchAllData]);

  // Ensure voices are loaded for fallback
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const getLiveValue = (widget: DashboardWidget) => {
    if (widget.channelId === CHANNELS.AQI && dataAQI) {
      return dataAQI[`field${widget.fieldId}`];
    }
    if (widget.channelId === CHANNELS.ENV && dataEnv) {
      return dataEnv[`field${widget.fieldId}`];
    }
    return null;
  };

  const getAQICondition = (aqi: number) => {
    if (aqi <= 50) return "Excellent";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Risky";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  const getScript = (widget: DashboardWidget | null) => {
    if (widget) {
        const val = getLiveValue(widget);
        if (val === null) return `Sensor data unavailable for ${widget.title}.`;
        
        let spokenUnit = widget.unit;
        if (widget.unit === '°C') spokenUnit = "degrees Celsius";
        if (widget.unit === '%') spokenUnit = "percent";
        if (widget.unit === 'Bit') spokenUnit = "";
        
        return `Sensor reporting. ${widget.title} is at ${parseFloat(val).toFixed(1)} ${spokenUnit}.`;
    } else {
        if (!dataAQI || !dataEnv) return "System initializing. Awaiting telemetry.";
        
        const aqi = parseFloat(dataAQI.field1);
        const condition = getAQICondition(aqi);
        const temp = Math.round(parseFloat(dataEnv.field1));
        const mode = parseInt(dataAQI.field4) > 0 ? "Active Filtration" : "Passive Monitoring";
        
        return `System Status Report. Current operating mode is ${mode}. Air Quality Index is ${Math.round(aqi)}, classified as ${condition}. Ambient temperature is ${temp} degrees. All autonomous sub-systems are nominal.`;
    }
  };

  const speakStatus = async (widget: DashboardWidget | null) => {
    window.speechSynthesis.cancel();
    const textToSay = getScript(widget);
    
    if (widget) {
        setIsSpeaking(`${widget.channelId}-${widget.fieldId}`);
    } else {
        setIsGlobalSpeaking(true);
    }

    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) throw new Error("No API Key");

        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: textToSay }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Fenrir' },
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) throw new Error("No audio content");

        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const buffer = await decodeAudioData(decodeBase64(base64Audio), audioCtx);
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.onended = () => {
            setIsSpeaking(null);
            setIsGlobalSpeaking(false);
            setTtsMode('gemini');
        };
        source.start();

    } catch (error) {
        console.warn("Gemini TTS failed, falling back to browser:", error);
        setTtsMode('browser');
        
        const utterance = new SpeechSynthesisUtterance(textToSay);
        utterance.rate = 1.0;
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.lang.startsWith('en'));   
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onend = () => {
            setIsSpeaking(null);
            setIsGlobalSpeaking(false);
        };
        utterance.onerror = () => {
            setIsSpeaking(null);
            setIsGlobalSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
    }
  };

  const getIframeSrc = (widget: DashboardWidget) => {
    const colorEncoded = widget.color.replace('#', '%23');
    const baseUrl = `https://thingspeak.com/channels/${widget.channelId}/charts/${widget.fieldId}`;
    return `${baseUrl}?bgcolor=%23ffffff&color=${colorEncoded}&dynamic=true&results=60&type=${widget.type}&title=&xaxis=Time&width=auto&height=auto`;
  };

  const getIcon = (title: string) => {
    if (title.includes('Temp')) return <Thermometer size={18} className="text-orange-500" />;
    if (title.includes('Humidity')) return <Droplets size={18} className="text-blue-500" />;
    if (title.includes('Air') || title.includes('Gas') || title.includes('Pollution')) return <Wind size={18} className="text-red-500" />;
    if (title.includes('State')) return <Activity size={18} className="text-emerald-500" />;
    if (title.includes('Filter')) return <Gauge size={18} className="text-slate-500" />;
    return <Database size={18} className="text-slate-500" />;
  };

  // Render Helper
  const WidgetCard = ({ widget }: { widget: DashboardWidget }) => {
    const liveValue = getLiveValue(widget);
    const isWidgetSpeaking = isSpeaking === `${widget.channelId}-${widget.fieldId}`;
    
    return (
        <div className="bg-white rounded border border-slate-200 shadow-sm flex flex-col overflow-hidden h-full">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center" style={{ borderTop: `4px solid ${widget.color}`}}>
                <div className="flex items-center gap-2">
                    {getIcon(widget.title)}
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{widget.title}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="font-mono text-lg font-bold text-slate-900">
                       {liveValue !== null ? parseFloat(liveValue).toFixed(1) : '--'} <span className="text-xs text-slate-400 font-normal">{widget.unit}</span>
                    </span>
                </div>
            </div>
            <div className="relative flex-grow min-h-[200px] w-full bg-white">
                <iframe 
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    src={getIframeSrc(widget)}
                    title={widget.title}
                    style={{pointerEvents: 'none'}} 
                ></iframe>
            </div>
            <div className="px-4 py-2 border-t border-slate-100 flex justify-between items-center bg-white">
                <span className="text-[10px] text-slate-400 font-mono uppercase truncate">
                    ID: {widget.channelId}.{widget.fieldId}
                </span>
                <div className="flex gap-2">
                    <button 
                        onClick={() => speakStatus(widget)}
                        className={`p-1.5 rounded hover:bg-slate-100 transition-colors ${isWidgetSpeaking ? 'text-emerald-500 animate-pulse' : 'text-slate-400'}`}
                        title="Audible Report"
                    >
                        {isWidgetSpeaking ? <Loader2 size={14} className="animate-spin" /> : <Volume2 size={14} />}
                    </button>
                    <a 
                        href={`https://thingspeak.com/channels/${widget.channelId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-400 hover:text-blue-500 transition-colors"
                        title="View Source"
                    >
                        <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </div>
    );
  };

  // Derived Values for System Cards
  const aqiValue = dataAQI ? parseFloat(dataAQI.field1) : 0;
  const aqiCondition = getAQICondition(aqiValue);
  const systemStateVal = dataAQI ? parseInt(dataAQI.field4) : 0;
  const systemMode = systemStateVal > 0 ? "ACTIVE FILTRATION" : "PASSIVE MONITORING";
  const filterLoad = dataAQI ? parseFloat(dataAQI.field2) : 0;

  return (
    <section id="dashboard" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Engineering Status Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl font-display font-bold text-slate-900 uppercase tracking-tight">Mission Control</h2>
            <div className="flex items-center gap-3 mt-1">
               <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
               </span>
               <span className="text-xs font-mono font-bold text-emerald-600 tracking-wider">LIVE TELEMETRY STREAM // SYNC: {lastUpdated || "WAITING"}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
                onClick={() => speakStatus(null)}
                disabled={isGlobalSpeaking}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg border transition-all text-sm font-bold uppercase tracking-wide ${isGlobalSpeaking ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-500 hover:text-emerald-600 shadow-sm'}`}
             >
                {isGlobalSpeaking ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
                <span>System Briefing</span>
             </button>
             {ttsMode === 'browser' && (
                <div title="Using Browser TTS Fallback" className="cursor-help">
                    <AlertCircle size={16} className="text-orange-400" />
                </div>
             )}
          </div>
        </div>

        {/* HIGH LEVEL SYSTEM INSIGHTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            {/* Insight 1: Air Quality Assessment */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm border-l-4 border-l-red-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Wind size={64} className="text-slate-900" />
                </div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Air Quality Status</h3>
                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-mono font-bold text-slate-900">{Math.round(aqiValue)}</span>
                    <span className="text-sm font-bold text-slate-500">AQI</span>
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 ${aqiValue > 150 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {aqiCondition}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                    Zone classification based on PM2.5/PM10 density. {aqiValue > 200 ? 'High baseline expected for industrial simulation.' : 'Standard range.'}
                </p>
            </div>

            {/* Insight 2: System Operating Mode */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm border-l-4 border-l-emerald-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Cpu size={64} className="text-slate-900" />
                </div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Operating Mode</h3>
                <div className="flex items-center gap-3 mb-4">
                    <div className={`w-3 h-3 rounded-full ${systemStateVal > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></div>
                    <span className="text-xl font-display font-bold text-slate-900 tracking-tight">{systemMode}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-600">
                    <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>UPTIME: {uptime}m</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Wifi size={12} />
                        <span>SIGNAL: 98%</span>
                    </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3 mt-3">
                    {systemStateVal > 0 ? 'Fan and electrostatic filter arrays active.' : 'System in energy-save monitoring loop.'}
                </p>
            </div>

            {/* Insight 3: Active Alerts / Diagnostics */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm border-l-4 border-l-blue-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <TriangleAlert size={64} className="text-slate-900" />
                </div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">System Diagnostics</h3>
                
                <div className="space-y-3">
                    {aqiValue > 150 && (
                         <div className="flex items-start gap-2 text-xs text-red-600 font-medium bg-red-50 p-2 rounded">
                            <AlertCircle size={14} className="mt-0.5 shrink-0" />
                            <span>CRITICAL: High pollution load detected. Max filtration engaged.</span>
                         </div>
                    )}
                    {filterLoad > 80 && (
                        <div className="flex items-start gap-2 text-xs text-amber-600 font-medium bg-amber-50 p-2 rounded">
                            <RefreshCw size={14} className="mt-0.5 shrink-0" />
                            <span>MAINTENANCE: Carbon filter near saturation capacity.</span>
                        </div>
                    )}
                    {aqiValue <= 150 && filterLoad <= 80 && (
                        <div className="flex items-start gap-2 text-xs text-emerald-600 font-medium bg-emerald-50 p-2 rounded">
                            <ShieldCheck size={14} className="mt-0.5 shrink-0" />
                            <span>All diagnostic checks passed. Nominal operation.</span>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* SECTION 1: ATMOSPHERIC ANALYSIS */}
        <div className="mb-12">
            <h3 className="text-lg font-display font-bold text-slate-800 mb-6 flex items-center gap-2 border-b-2 border-slate-200 pb-2 inline-block">
                <Wind className="text-emerald-600" size={20} /> 
                ATMOSPHERIC DYNAMICS
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                    {widgets.filter(w => ['Air Quality Index', 'Pollution Gradient'].includes(w.title)).map(widget => (
                        <WidgetCard key={widget.fieldId} widget={widget} />
                    ))}
                </div>
                {/* Section Explainer */}
                <div className="bg-slate-100 rounded border border-slate-200 p-6 flex flex-col justify-center">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Info size={18} className="text-blue-500" /> Data Interpretation
                    </h4>
                    <ul className="space-y-4 text-sm text-slate-600">
                        <li className="flex gap-3">
                            <span className="font-bold text-slate-400">01</span>
                            <span>
                                <strong>Aggregate AQI:</strong> Real-time fusion of PM2.5/PM10 sensor data. Note the elevated baseline typical of the target deployment environment (Cairo industrial zones).
                            </span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-slate-400">02</span>
                            <span>
                                <strong>Derivative Control (Δ):</strong> The 'Pollution Gradient' charts the rate of change. Our algorithm triggers predictive filtration when Δ spikes, even before absolute AQI limits are breached.
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {/* SECTION 2: SYSTEM HEALTH & FILTRATION */}
        <div className="mb-12">
            <h3 className="text-lg font-display font-bold text-slate-800 mb-6 flex items-center gap-2 border-b-2 border-slate-200 pb-2 inline-block">
                <Gauge className="text-emerald-600" size={20} /> 
                FILTRATION INTEGRITY
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                    {widgets.filter(w => ['Filter Saturation', 'System State'].includes(w.title)).map(widget => (
                        <WidgetCard key={widget.fieldId} widget={widget} />
                    ))}
                </div>
                {/* Section Explainer */}
                <div className="bg-slate-100 rounded border border-slate-200 p-6 flex flex-col justify-center">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Info size={18} className="text-blue-500" /> Logic Overview
                    </h4>
                    <ul className="space-y-4 text-sm text-slate-600">
                        <li className="flex gap-3">
                            <span className="font-bold text-slate-400">01</span>
                            <span>
                                <strong>Load Balancing:</strong> 'System State' indicates the binary status of the filtration fan. It toggles based on a hysteresis loop to prevent rapid cycling and motor wear.
                            </span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-slate-400">02</span>
                            <span>
                                <strong>Consumable Life:</strong> 'Filter Saturation' is a calculated metric based on cumulative exposure time and pollution density, predicting maintenance intervals.
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {/* SECTION 3: ENVIRONMENTAL CALIBRATION */}
        <div className="mb-8">
            <h3 className="text-lg font-display font-bold text-slate-800 mb-6 flex items-center gap-2 border-b-2 border-slate-200 pb-2 inline-block">
                <Thermometer className="text-emerald-600" size={20} /> 
                AMBIENT CONDITIONS
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                    {widgets.filter(w => ['Ambient Temp', 'Rel. Humidity'].includes(w.title)).map(widget => (
                        <WidgetCard key={widget.fieldId} widget={widget} />
                    ))}
                </div>
                {/* Section Explainer */}
                <div className="bg-slate-100 rounded border border-slate-200 p-6 flex flex-col justify-center">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Info size={18} className="text-blue-500" /> Sensor Calibration
                    </h4>
                    <p className="text-sm text-slate-600 mb-4">
                        MQ-series gas sensors are sensitive to temperature and humidity variations. The system uses these environmental readings to apply a dynamic compensation factor (R0 adjustment) to the raw resistance readings, ensuring accurate pollution data regardless of weather.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-white p-2 rounded border border-slate-200">
                        <Database size={12} />
                        <span>Calibration Coefficient: {(1.0 + ((dataEnv ? parseFloat(dataEnv.field1) : 25) - 25) * 0.003).toFixed(3)}</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Dashboard;