import React, { useState } from 'react';
import { TeamMember } from '../types';
import { Github, Linkedin, Mail } from 'lucide-react';

const members: TeamMember[] = [
  {
    name: 'Mahmoud Hesham Elkholany',
    role: 'Lead Solutions Architect',
    image: 'https://ai-mahmoud.github.io/assets/mahmoud.jpg',
    socials: {
        github: 'https://github.com/ai-mahmoud',
        linkedin: 'https://linkedin.com/in/mahmoud-elkholany',
        email: 'mahmoud.dev.ai@gmail.com'
    }
  },
  {
    name: 'Malak Mohamed El-Atfy',
    role: 'Embedded Systems Lead',
    image: 'https://ai-mahmoud.github.io/assets/malak.jpg'
  },
  {
    name: 'Mariam Ahmed Hany',
    role: 'Director of Operations',
    image: 'https://ai-mahmoud.github.io/assets/mariam.jpg'
  }
];

const MemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [imgSrc, setImgSrc] = useState<string>(member.image);
  
  const handleError = () => {
    if (!imgSrc.includes('ui-avatars.com')) {
      setImgSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1f2937&color=9ca3af&size=400`);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all duration-300 group">
       <div className="aspect-square w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
          <img 
            src={imgSrc} 
            alt={member.name} 
            onError={handleError}
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
             <div className="flex justify-center gap-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                {member.socials?.github ? (
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors"><Github size={18} /></a>
                ) : (
                    <div className="opacity-50 cursor-not-allowed"><Github size={18} /></div>
                )}
                {member.socials?.linkedin ? (
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors"><Linkedin size={18} /></a>
                ) : (
                    <div className="opacity-50 cursor-not-allowed"><Linkedin size={18} /></div>
                )}
                {member.socials?.email ? (
                    <a href={`mailto:${member.socials.email}`} className="hover:text-emerald-400 transition-colors"><Mail size={18} /></a>
                ) : (
                    <div className="opacity-50 cursor-not-allowed"><Mail size={18} /></div>
                )}
             </div>
          </div>
       </div>
       <div className="p-5 text-center border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 relative z-10">
         <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display uppercase tracking-tight">{member.name}</h3>
         <p className="text-emerald-600 dark:text-emerald-500 text-xs font-bold uppercase tracking-widest mt-1 border-t border-slate-100 dark:border-slate-800 pt-2 inline-block px-4">
            {member.role}
         </p>
       </div>
    </div>
  );
};

const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div>
            <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Executive Board</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400 font-mono text-sm">ATMOSMART ENGINEERING GROUP</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Global Operations</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {members.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;