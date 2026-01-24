import React from 'react';
import { TeamMember } from '../types';

const members: TeamMember[] = [
  {
    name: 'Sarah Jenkins',
    role: 'Lead Systems Engineer',
    image: 'https://picsum.photos/seed/sarah/200/200'
  },
  {
    name: 'David Chen',
    role: 'Embedded Software Developer',
    image: 'https://picsum.photos/seed/david/200/200'
  },
  {
    name: 'Marcus Johnson',
    role: 'Hardware Specialist',
    image: 'https://picsum.photos/seed/marcus/200/200'
  },
  {
    name: 'Emily Wong',
    role: 'Data Analyst',
    image: 'https://picsum.photos/seed/emily/200/200'
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member) => (
            <div key={member.name} className="group relative">
               <div className="aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden bg-gray-800 mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
               </div>
               <h3 className="text-xl font-bold text-white">{member.name}</h3>
               <p className="text-emerald-500 text-sm font-medium uppercase tracking-wider">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;