import React from 'react';
import { Wind, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-gray-900">
            <Wind size={18} />
          </div>
          <span className="font-display text-xl font-bold text-gray-900 dark:text-white">
            AtmoSmart
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} AtmoSmart Project Team. All rights reserved.
        </p>

        <div className="flex space-x-6">
          <a href="https://github.com/ai-mahmoud" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/mahmoud-elkholany" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 transition-colors" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="mailto:mahmoud.dev.ai@gmail.com" className="text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;