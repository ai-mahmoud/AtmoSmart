import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLink, RefreshCw, Volume2, Loader2, Play, AlertCircle, Thermometer, Droplets, Wind, Activity, CheckCircle } from 'lucide-react';
import { DashboardWidget } from '../types';

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
    color: '#ef4444', // Red for alert/action
    unit: 'AQI',
    description: 'Real-time air quality measurement.'
  },
  {
    title: 'Carbon Filter Load',
    channelId: CHANNELS.AQI,
    fieldId: 2,
    type: 'line',
    color: '#64748b', // Slate for hardware status
    unit: '%',
    description: 'Saturation level of the active carbon filter.'
  },
  {
    title: 'Pollution Trend',
    channelId: CHANNELS.AQI,
    fieldId: 3,
    type: 'spline',
    color: '#8b5cf6', // Violet for abstract data
    unit: 'Idx',
    description: 'Derivative trend analysis of pollutants.'
  },
  {
    title: 'System Status',
    channelId: CHANNELS.AQI,
    fieldId: 4,
    type: 'line',
    color: '#10b981', // Emerald for status
    unit: 'State',
    description: 'Operational state of the purification unit.'
  },
  {
    title: 'Temperature',
    channelId: CHANNELS.ENV,
    fieldId: 1,
    type: 'spline',
    color: '#f97316', // Orange for heat
    unit: '°C',
    description: 'Ambient temperature sensor data.'
  },
  {
    title: 'Humidity',
    channelId: CHANNELS.ENV,
    fieldId: 2,
    type: 'spline',
    color: '#0ea5e9', // Blue for water
    unit: '%',
    description: 'Relative humidity percentage.'
  }
];

const Dashboard: React.FC = () => {
  const [dataAQI, setDataAQI] = useState<any>(null);
  const [dataEnv, setDataEnv] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null); // key: channelId-fieldId
  const [isGlobalSpeaking, setIsGlobalSpeaking] = useState(false);
  const [ttsError, setTtsError] = useState<string | null>(null);

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
    return () => clearInterval(interval);
  }, [fetchAllData]);

  // Ensure voices are loaded
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
    if (aqi <= 50) return "excellent";
    if (aqi <= 100) return "moderate";
    if (aqi <= 150) return "risky for sensitive groups";
    if (aqi <= 200) return "unhealthy";
    if (aqi <= 300) return "very unhealthy";
    return "hazardous";
  };

  const speakStatus = (widget: DashboardWidget | null) => {
    setTtsError(null);

    if (!('speechSynthesis' in window)) {
      setTtsError("Text-to-speech not supported.");
      return;
    }

    // Cancel any current speech
    window.speechSynthesis.cancel();

    if (widget) {
        setIsSpeaking(`${widget.channelId}-${widget.fieldId}`);
    } else {
        setIsGlobalSpeaking(true);
    }

    let message = "";
    
    if (widget) {
      const val = getLiveValue(widget);
      if (val !== null) {
          // Clean the unit for speech (e.g., "deg C" instead of "°C" if necessary, but browsers handle symbols okay usually)
          let spokenUnit = widget.unit;
          if (widget.unit === '°C') spokenUnit = "degrees Celsius";
          if (widget.unit === '%') spokenUnit = "percent";
          
          message = `The ${widget.title} is currently ${parseFloat(val).toFixed(1)} ${spokenUnit}.`;
      } else {
          message = `I cannot currently read the sensor data for ${widget.title}.`;
      }
    } else {
      // Global Briefing Logic
      if (dataAQI && dataEnv) {
          const aqi = dataAQI.field1;
          
          const aqiNum = parseFloat(aqi);
          const condition = getAQICondition(aqiNum);
          
          // "the overall air quality is [variable], and that is [if condition to choose whether it is good, bad, risky]"
          message = `The overall air quality is ${Math.round(aqiNum)}, and that is ${condition}.`;
          
          // Add environmental context if available
          if (dataEnv.field1) {
             message += ` The temperature is ${Math.round(parseFloat(dataEnv.field1))} degrees.`;
          }
      } else {
          message = "System is initializing. Please wait for sensor streams to connect.";
      }
    }

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Attempt to pick a decent English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = 
        voices.find(v => v.name.includes('Google US English')) || 
        voices.find(v => v.name.includes('Samantha')) || // macOS common
        voices.find(v => v.lang.startsWith('en-US')) ||
        voices.find(v => v.lang.startsWith('en'));
        
    if (preferredVoice) {
        utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      setIsSpeaking(null);
      setIsGlobalSpeaking(false);
    };

    utterance.onerror = (e) => {
      console.error("TTS Error:", e);
      setIsSpeaking(null);
      setIsGlobalSpeaking(false);
      // Only set error if it wasn't a manual cancel or immediate interruption
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
          setTtsError("Audio playback error.");
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const getIframeSrc = (widget: DashboardWidget) => {
    // URL Encode the hex color (replace # with %23)
    const colorEncoded = widget.color.replace('#', '%23');
    const baseUrl = `https://thingspeak.com/channels/${widget.channelId}/charts/${widget.fieldId}`;
    // Dynamic params for cleaner look: no title (we handle it), dynamic scale, specific styling
    return `${baseUrl}?bgcolor=%23ffffff&color=${colorEncoded}&dynamic=true&results=60&type=${widget.type}&title=&xaxis=Time`;
  };

  const getIcon = (title: string) => {
    if (title.includes('Temp')) return <Thermometer size={20} className="text-orange-500" />;
    if (title.includes('Humidity')) return <Droplets size={20} className="text-blue-500" />;
    if (title.includes('Air') || title.includes('Gas')) return <Wind size={20} className="text-red-500" />;
    if (title.includes('Status')) return <CheckCircle size={20} className="text-emerald-500" />;
    return <Activity size={20} className="text-gray-500" />;
  };

  return (
    <section id="dashboard" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse absolute top-0 right-0 -mt-1 -mr-1"></div>
              <div className="p-3 bg-slate-100 rounded-lg">
                <Activity className="text-slate-700" size={24} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-display font-semibold text-slate-900">Live Telemetry</h2>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="font-mono">Sync: {lastUpdated || 'Connecting...'}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="text-emerald-600 font-medium">System Nominal</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-3">
               <button 
                  onClick={() => speakStatus(null)}
                  disabled={isGlobalSpeaking}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-md transition-all hover:scale-105 active:scale-95 ${isGlobalSpeaking ? 'bg-slate-400' : 'bg-gradient-to-r from-slate-800 to-slate-900'}`}
               >
                  {isGlobalSpeaking ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} fill="currentColor" />}
                  <span>Wait-less Briefing</span>
               </button>
            </div>
            {ttsError && (
                <div className="text-xs font-medium text-red-500 bg-red-50 px-3 py-1 rounded-md border border-red-100 flex items-center gap-1">
                   <AlertCircle size={10} />
                   {ttsError}
                </div>
            )}
          </div>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgets.map((widget) => {
            const liveValue = getLiveValue(widget);
            const isWidgetSpeaking = isSpeaking === `${widget.channelId}-${widget.fieldId}`;
            
            return (
              <div key={`${widget.channelId}-${widget.fieldId}`} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
                
                {/* Card Header & Live Data */}
                <div className="p-6 pb-2">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                        {getIcon(widget.title)}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{widget.title}</h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-display font-bold text-slate-900">
                             {liveValue !== null ? parseFloat(liveValue).toFixed(1) : '--'}
                          </span>
                          <span className="text-sm font-medium text-slate-400">{widget.unit}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => speakStatus(widget)}
                      disabled={isWidgetSpeaking}
                      className={`p-2 rounded-full transition-colors ${isWidgetSpeaking ? 'bg-emerald-100 text-emerald-600' : 'hover:bg-slate-100 text-slate-400'}`}
                    >
                       {isWidgetSpeaking ? <Loader2 size={18} className="animate-spin" /> : <Volume2 size={18} />}
                    </button>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="flex-grow bg-white relative h-48 w-full border-t border-slate-100">
                   <iframe 
                      className="absolute inset-0 w-full h-full pointer-events-none" // pointer-events-none prevents scroll trap in mobile
                      frameBorder="0"
                      src={getIframeSrc(widget)}
                      title={widget.title}
                    ></iframe>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-medium truncate max-w-[70%]">
                      {widget.description}
                    </span>
                    <a 
                      href={`https://thingspeak.com/channels/${widget.channelId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                    >
                      History <ExternalLink size={10} />
                    </a>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 flex justify-center">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-xs text-slate-500">
                <RefreshCw size={12} className="animate-spin-slow text-emerald-500" />
                <span>Synchronized with ThingSpeak™ IoT Cloud (15s polling)</span>
             </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;