import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold tracking-wide text-emerald-600 uppercase mb-2">Operational Risk Management</h2>
            <h3 className="text-3xl font-display font-medium text-gray-900 sm:text-4xl mb-6">
              The Invisible Cost of Non-Compliance
            </h3>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Industrial facilities face a dual challenge: adhering to increasingly strict environmental regulations (ESG) while maintaining optimal workforce productivity. 
                Unmonitored fluctuations in Particulate Matter (PM) and volatile organic compounds create liability risks and degrade operational efficiency.
              </p>
              <p>
                Legacy solutions rely on static, grid-dependent monitoring that offers data but lacks context. 
                AtmoSmart delivers an autonomous, predictive intelligence layer, transforming raw environmental data into actionable compliance strategies and automated safety protocols.
              </p>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 relative">
             <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-slate-500 transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl opacity-10"></div>
             <div className="relative rounded-2xl shadow-xl overflow-hidden bg-gray-900 border border-gray-800">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2670" 
                  alt="Modern industrial facility" 
                  className="w-full h-full object-cover opacity-60 hover:opacity-75 transition-opacity duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                    <p className="font-mono text-xs text-emerald-400 mb-1">REAL-TIME RISK MONITORING</p>
                    <p className="font-display text-lg">Optimizing Indoor Environmental Quality (IEQ)</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;