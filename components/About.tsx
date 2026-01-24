import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold tracking-wide text-emerald-600 uppercase mb-2">The Problem</h2>
            <h3 className="text-3xl font-display font-medium text-gray-900 sm:text-4xl mb-6">
              The Silent Threat of Air Pollution
            </h3>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Rapid industrialization and urbanization have led to a drastic increase in air pollutants. 
                Particulate matter and harmful gases like CO2 and NH3 pose severe health risks, causing respiratory diseases and environmental degradation.
              </p>
              <p>
                Conventional air purifiers rely heavily on the power grid, contributing to the very carbon footprint they aim to mitigate. 
                There is a critical need for a sustainable, autonomous solution that creates clean air zones without increasing energy consumption.
              </p>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 relative">
             <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl opacity-20"></div>
             <div className="relative rounded-2xl shadow-xl overflow-hidden bg-gray-900">
                <img 
                  src="https://picsum.photos/800/600?grayscale" 
                  alt="Industrial smoke and pollution" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <p className="font-mono text-sm">Global Challenge: Reducing PM2.5 & CO2</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;