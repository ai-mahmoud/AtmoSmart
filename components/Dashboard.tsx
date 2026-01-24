import React from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { DashboardWidget } from '../types';

// Configuration for the ThingSpeak charts
const CHANNEL_ID = '3234017';
const BASE_URL = `https://thingspeak.com/channels/${CHANNEL_ID}/charts`;

const widgets: DashboardWidget[] = [
  {
    title: 'MQ135 Gas Sensor Readings',
    fieldId: 1,
    type: 'line',
    description: 'Real-time raw voltage output indicating general air quality.'
  },
  {
    title: 'Air Quality Index (AQI)',
    fieldId: 2,
    type: 'gauge',
    description: 'Calculated AQI based on sensor ppm conversion.'
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
    type: 'line', // Using line to show history of usage
    description: 'Usage tracking of the active carbon filter element.'
  },
  {
    title: 'Pollution Trend',
    fieldId: 5,
    type: 'column',
    description: '-1: Improving | 0: Stable | 1: Worsening'
  },
  {
    title: 'Environmental Risk Level',
    fieldId: 6,
    type: 'line',
    description: '0: Safe | 1: Warning | 2: Critical Danger'
  }
];

const Dashboard: React.FC = () => {
  
  const getIframeSrc = (widget: DashboardWidget) => {
    // Common parameters for a clean white look
    const commonParams = `bgcolor=%23ffffff&color=%2310b981&dynamic=true&results=60&title=&type=${widget.type}`;
    
    // Customization per type
    if (widget.type === 'column') {
        return `${BASE_URL}/${widget.fieldId}?${commonParams}&color=%230ea5e9`; // Blue for trend
    }
    if (widget.type === 'step') {
        return `${BASE_URL}/${widget.fieldId}?${commonParams}&color=%23f59e0b`; // Amber for status
    }
    // Note: ThingSpeak chart endpoint creates a chart. 
    // If a true "Gauge" widget was created on ThingSpeak, it would use /widgets/ID. 
    // Since we only have field IDs, we visualize the data as charts which is valid for engineering dashboards.
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
          <div className="mt-4 md:mt-0">
             <a 
                href={`https://thingspeak.com/channels/${CHANNEL_ID}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
             >
                <ExternalLink size={16} />
                View Raw Data on ThingSpeak
             </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgets.map((widget) => (
            <div key={widget.fieldId} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide truncate pr-4">
                  {widget.title}
                </h3>
                <div className={`w-2 h-2 rounded-full ${widget.fieldId ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
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

              <div className="px-6 py-3 bg-white border-t border-gray-100">
                <p className="text-xs text-gray-500">
                    <span className="font-semibold text-gray-700">Field {widget.fieldId}:</span> {widget.description}
                </p>
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