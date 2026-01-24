import React from 'react';
import { Wind, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white">
            <Wind size={18} />
          </div>
          <span className="font-display text-xl font-bold text-gray-900">
            AtmoSmart
          </span>
        </div>

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} AtmoSmart Project Team. All rights reserved.
        </p>

        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
            <Github size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-emerald-600 transition-colors">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;