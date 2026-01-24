import React from 'react';
import { TechItem } from '../types';

const techItems: TechItem[] = [
  {
    name: 'ESP32 MCU',
    icon: 'https://cdn.iconscout.com/icon/free/png-256/free-arduino-logo-icon-download-in-svg-png-gif-file-formats--programming-language-logos-icons-1720092.png?f=webp&w=128',
    description: 'Dual-core microcontroller handling sensor data acquisition and WiFi connectivity.'
  },
  {
    name: 'ThingSpeak',
    icon: 'https://cdn.mathworks.com/images/responsive/global/shared/bg_thingspeak_logo.svg', 
    description: 'IoT analytics platform service for aggregation, visualization, and analysis of live data streams.'
  },
  {
    name: 'MQ135',
    icon: 'https://img.icons8.com/ios/100/10b981/sensor.png',
    description: 'High sensitivity gas sensor for detecting NH3, NOx, alcohol, benzene, smoke and CO2.'
  },
  {
    name: 'React & Tailwind',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
    description: 'Modern frontend framework for building a responsive, high-performance monitoring dashboard.'
  }
];

const TechStack: React.FC = () => {
  return (
    <section id="tech" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-medium text-gray-900">Technology Stack</h2>
          <p className="mt-4 text-xl text-gray-500">Built with industry-standard hardware and software components.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {techItems.map((item) => (
            <div key={item.name} className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="h-20 w-20 flex items-center justify-center mb-6 bg-white rounded-full shadow-sm p-4">
                <img src={item.icon} alt={item.name} className="max-h-full max-w-full object-contain" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;