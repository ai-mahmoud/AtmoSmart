import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLink, RefreshCw, Volume2, Loader2, Play, AlertCircle } from 'lucide-react';
import { DashboardWidget } from '../types';
import { GoogleGenAI, Modality } from "@google/genai";

// Configuration for the ThingSpeak charts
const CHANNEL_ID = '3234017';
const BASE_URL = `https://thingspeak.com/channels/${CHANNEL_ID}/charts`;
const API_URL = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds/last.json`;

const widgets: DashboardWidget[] = [
  {
    title: 'MQ135 Gas Sensor',
    fieldId: 1,
    type: 'line',
    description: 'Real-time raw voltage output indicating general air quality.'
  },
  {
    title: 'Air Quality Index (AQI)',
    fieldId: 2,
    type: 'spline',
    description: 'Calculated AQI trend based on sensor ppm conversion.'
  },
  {
    title: 'Ventilation Fan Status',
    fieldId: 3,
    type: 'step',
    description: 'Binary status: 0 = Off, 1 = On (Active Purification).'
  },
  {
    title: 'Carbon Filter Status',
    fieldId: 4,
    type: 'line',
    description: 'Usage tracking of the active carbon filter element.'
  },
  {
    title: 'Pollution Trend',
    fieldId: 5,
    type: 'column',
    description: '-1: Improving | 0: Stable | 1: Worsening'
  },
  {
    title: 'Risk Level',
    fieldId: 6,
    type: 'step',
    description: '0: Safe | 1: Warning | 2: Critical Danger'
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
  const [lastData, setLastData] = useState<any>(null);
  const [isSpeaking, setIsSpeaking] = useState<number | null>(null);
  const [isGlobalSpeaking, setIsGlobalSpeaking] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  const fetchLastData = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setLastData(data);
    } catch (error) {
      console.error("Error fetching ThingSpeak data:", error);
    }
  }, []);

  useEffect(() => {
    fetchLastData();
    const interval = setInterval(fetchLastData, 15000);
    return () => clearInterval(interval);
  }, [fetchLastData]);

  const speakStatus = async (widget: DashboardWidget | null) => {
    // Access the API key injected by Vite
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      setApiKeyMissing(true);
      // NOTE: Do not include "process.env.API_KEY" literally in the string below as Vite replaces it during build
      console.error("Gemini API Key is missing in environment variables.");
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
    if (widget) setIsSpeaking(widget.fieldId);
    else setIsGlobalSpeaking(true);

    try {
      let message = "";
      if (widget && lastData) {
        const value = parseFloat(lastData[`field${widget.fieldId}`]);
        
        if (widget.fieldId === 1 || widget.fieldId === 2) {
          const status = value < 100 ? "Good" : value < 300 ? "Normal" : "Bad";
          message = `The current ${widget.title} reading is ${value.toFixed(1)}. This is considered ${status}.`;
        } else if (widget.fieldId === 3) {
          message = `The Ventilation Fan is currently ${value === 1 ? "On and purifying the air" : "Off"}.`;
        } else if (widget.fieldId === 5) {
          const trend = value === -1 ? "Improving" : value === 1 ? "Worsening" : "Stable";
          message = `The Pollution Trend is currently ${trend}.`;
        } else if (widget.fieldId === 6) {
          const risk = value === 0 ? "Safe" : value === 1 ? "Warning" : "Critical Danger";
          message = `The Environmental Risk Level is ${risk}.`;
        } else {
          message = `The current value for ${widget.title} is ${value}.`;
        }
      } else if (lastData) {
        // Global Briefing
        const aqi = parseFloat(lastData.field2);
        const fan = parseFloat(lastData.field3);
        const trend = parseFloat(lastData.field5);
        message = `System Briefing: Air quality index is ${aqi.toFixed(0)}, which is ${aqi < 100 ? 'good' : 'fair'}. 
        The purification fan is ${fan === 1 ? 'active' : 'idle'}. The overall trend is ${trend === -1 ? 'improving' : 'stable'}. 
        AtmoSmart is operating normally.`;
      } else {
        message = "Connecting to the AtmoSmart sensor network. Please wait a moment.";
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Say clearly and concisely: ${message}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const buffer = await decodeAudioData(decodeBase64(base64Audio), audioCtx);
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.onended = () => {
          setIsSpeaking(null);
          setIsGlobalSpeaking(false);
        };
        source.start();
      }
    } catch (error) {
      console.error("TTS Error:", error);
      setIsSpeaking(null);
      setIsGlobalSpeaking(false);
    }
  };

  const getIframeSrc = (widget: DashboardWidget) => {
    const commonParams = `bgcolor=%23ffffff&color=%2310b981&dynamic=true&results=60&title=&type=${widget.type}`;
    if (widget.type === 'column') return `${BASE_URL}/${widget.fieldId}?${commonParams}&color=%230ea5e9`;
    if (widget.type === 'step') return `${BASE_URL}/${widget.fieldId}?${commonParams}&color=%23f59e0b`;
    return `${BASE_URL}/${widget.fieldId}?${commonParams}`;
  };

  return (
    <section id="dashboard" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="inline-block py-1 px-3 rounded bg-red-100 text-red-600 text-xs font-bold tracking-wider uppercase mb-2">
              Live Connection
            </span>
            <h2 className="text-3xl font-display font-medium text-gray-900">
              Live IoT Dashboard
            </h2>
            <p className="mt-2 text-gray-600">
              Monitoring Channel ID: <span className="font-mono font-bold">{CHANNEL_ID}</span>
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end gap-3">
             <div className="flex gap-3">
               <button 
                  onClick={() => speakStatus(null)}
                  disabled={isGlobalSpeaking}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-white shadow-lg transition-all transform hover:-translate-y-0.5 ${isGlobalSpeaking ? 'bg-gray-400' : 'bg-emerald-600 hover:bg-emerald-700'}`}
               >
                  {isGlobalSpeaking ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} fill="currentColor" />}
                  {isGlobalSpeaking ? 'Speaking...' : 'System Briefing'}
               </button>
               <a 
                  href={`https://thingspeak.com/channels/${CHANNEL_ID}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
               >
                  <ExternalLink size={16} />
                  Raw Data
               </a>
             </div>
             {apiKeyMissing && (
                <div className="text-xs text-red-500 font-medium flex items-center gap-1 bg-red-50 px-2 py-1 rounded border border-red-200">
                  <AlertCircle size={12} />
                  Voice Assistant Unavailable (Missing API Key)
                </div>
             )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgets.map((widget) => (
            <div key={widget.fieldId} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide truncate pr-4">
                  {widget.title}
                </h3>
                <div className="flex items-center gap-3">
                   <button 
                      onClick={() => speakStatus(widget)}
                      disabled={isSpeaking === widget.fieldId}
                      aria-label={`Read ${widget.title} status`}
                      className={`p-1.5 rounded-lg transition-colors ${isSpeaking === widget.fieldId ? 'text-emerald-600 bg-emerald-50' : 'text-gray-400 hover:text-emerald-600 hover:bg-gray-100'}`}
                   >
                      {isSpeaking === widget.fieldId ? <Loader2 size={18} className="animate-spin" /> : <Volume2 size={18} />}
                   </button>
                   <div className={`w-2 h-2 rounded-full ${lastData ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                </div>
              </div>
              
              <div className="relative w-full h-[260px] bg-white">
                 <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    src={getIframeSrc(widget)}
                    title={widget.title}
                    allowFullScreen
                  ></iframe>
              </div>

              <div className="px-6 py-3 bg-white border-t border-gray-100 mt-auto">
                <div className="flex justify-between items-start mb-1">
                    <p className="text-xs text-gray-500 leading-tight">
                        <span className="font-semibold text-gray-700">Info:</span> {widget.description}
                    </p>
                </div>
                {lastData && (
                    <div className="text-xs font-mono font-semibold text-emerald-600">
                        Live: {parseFloat(lastData[`field${widget.fieldId}`] || 0).toFixed(2)}
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
             <p className="text-sm text-gray-400 italic flex items-center gap-2">
                <RefreshCw size={14} className="animate-spin-slow" />
                Data refreshes automatically every 15 seconds
             </p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;