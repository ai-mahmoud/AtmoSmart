import React from 'react';
import { TeamMember } from '../types';

// Use relative imports for assets to ensure compatibility with Vite and browser resolution.
// The '../' traverses up from 'components' to the root where 'assets' is located.
import mahmoudImg from '../assets/mahmoud.jpg';
import malakImg from '../assets/malak.jpg';

const members: TeamMember[] = [
  {
    name: 'Mahmoud Hesham Elkholany',
    role: 'Data Scientist & Web Developer',
    image: mahmoudImg
  },
  {
    name: 'Malak Mohamed El-Atfy',
    role: 'Embedded Systems & Hardware Engineer',
    image: malakImg
  },
  {
    name: 'Mariam Ahmed Hany',
    role: 'Business Operations Lead',
    // Temporary placeholder until photo is available
    image: 'https://ui-avatars.com/api/?name=Mariam+Ahmed+Hany&background=10b981&color=fff&size=400'
  }
];

const Team: React.FC = () => {
  return (
    <section id="team" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div>
            <h2 className="text-3xl font-display font-medium text-white">Team AtmoSmart</h2>
            <p className="mt-2 text-gray-400">Engineering future sustainability.</p>
          </div>
          <div className="mt-4 md:mt-0 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
            <span className="text-sm font-mono text-emerald-400">EST. 2023</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {members.map((member) => (
            <div key={member.name} className="group relative bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-900/20">
               <div className="aspect-square w-full rounded-xl overflow-hidden bg-gray-700 mb-6 relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        // Generates a professional initial avatar if the image file is missing or fails to load
                        const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1f2937&color=9ca3af&size=400`;
                        if (target.src !== fallbackUrl) {
                            target.src = fallbackUrl;
                        }
                    }}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300"></div>
               </div>
               <div className="text-center">
                 <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                 <p className="text-emerald-400 text-sm font-medium uppercase tracking-wider">{member.role}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;