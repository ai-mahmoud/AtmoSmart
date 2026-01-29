import React, { useState } from 'react';
import { Menu, X, Wind } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Mission', href: '#about' },
    { name: 'Architecture', href: '#system' },
    { name: 'Intelligence Platform', href: '#dashboard', primary: true },
    { name: 'Infrastructure', href: '#tech' },
    { name: 'Board', href: '#team' },
  ];

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <a href="#" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-sky-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Wind size={24} />
              </div>
              <span className="font-display text-2xl font-medium tracking-tight text-gray-900">
                Atmo<span className="text-emerald-600">Smart</span>
              </span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  link.primary
                    ? 'bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 rounded-md text-base font-medium text-center ${
                  link.primary
                    ? 'bg-slate-900 text-white'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;