import React from 'react';
import { Cpu, Server, Zap, Fan } from 'lucide-react';

const SystemOverview: React.FC = () => {
  return (
    <section id="system" className="py-20 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-medium text-gray-900 sm:text-4xl">System Architecture</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            From sensor to cloud, ensuring seamless data transmission and autonomous control.
          </p>
        </div>

        <div className="relative">
            {/* Connector Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {/* Step 1 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center relative z-10">
                    <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm">
                        <Zap size={32} />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">Power Supply</h4>
                    <p className="text-sm text-gray-500 mt-2">Solar Panel & Li-Ion Battery Management System</p>
                </div>

                {/* Step 2 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center relative z-10">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm">
                        <Cpu size={32} />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">Sensing</h4>
                    <p className="text-sm text-gray-500 mt-2">MQ135 Gas Sensor array detecting CO2, NH3, Benzene</p>
                </div>

                {/* Step 3 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center relative z-10">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm">
                        <Cpu size={32} />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">Processing</h4>
                    <p className="text-sm text-gray-500 mt-2">ESP32 Microcontroller processes data & logic</p>
                </div>

                {/* Step 4 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center relative z-10">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm">
                        <Fan size={32} />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">Actuation</h4>
                    <p className="text-sm text-gray-500 mt-2">Fan & Carbon Filter activation based on thresholds</p>
                </div>

                {/* Step 5 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center relative z-10">
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm">
                        <Server size={32} />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">Cloud IoT</h4>
                    <p className="text-sm text-gray-500 mt-2">ThingSpeak API for logging and visualization</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default SystemOverview;