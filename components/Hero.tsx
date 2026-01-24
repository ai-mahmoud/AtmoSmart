import React from 'react';
import { Activity, Sun, ShieldCheck } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-emerald-100 blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-blue-100 blur-3xl opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold mb-6 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Online & Monitoring
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-medium text-gray-900 tracking-tight mb-6">
            Solar Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Air Purification</span>
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-500 mt-2 block">Smart IoT Monitoring System</span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
            AtmoSmart delivers intelligent, autonomous air quality management powered by renewable energy. 
            Real-time analytics meet sustainable engineering.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#dashboard" className="px-8 py-3 rounded-lg bg-emerald-600 text-white font-semibold shadow-lg hover:bg-emerald-700 transition-transform hover:-translate-y-1 flex items-center gap-2">
              <Activity size={20} />
              View Live Data
            </a>
            <a href="#system" className="px-8 py-3 rounded-lg bg-white text-gray-700 font-semibold border border-gray-200 shadow-sm hover:bg-gray-50 transition-transform hover:-translate-y-1 flex items-center gap-2">
              <Sun size={20} />
              How It Works
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
              <Sun size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Energy Autonomous</h3>
            <p className="text-gray-600">Operates completely off-grid using high-efficiency solar panels and battery storage.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Activity size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Real-time IoT</h3>
            <p className="text-gray-600">Live data streaming to ThingSpeak for instant analysis of air quality metrics.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Smart Filtration</h3>
            <p className="text-gray-600">Automated activation of carbon filters based on sensor threshold levels.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;