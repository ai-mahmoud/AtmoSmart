import React, { useState, useEffect } from 'react';
import { Menu, X, Wind, Sun, Moon } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check localStorage. Default to light mode (base white) if no preference is saved.
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: 'Strategy', href: '#strategy' },
    { name: 'Architecture', href: '#system' },
    { name: 'Platform', href: '#dashboard', primary: true },
    { name: 'Infrastructure', href: '#tech' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Board', href: '#team' },
  ];

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-sm fixed w-full z-50 transition-all duration-300 border-b border-gray-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <a href="#" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-sky-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Wind size={24} />
              </div>
              <span className="font-display text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
                Atmo<span className="text-emerald-600 dark:text-emerald-500">Smart</span>
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
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-full hover:bg-slate-800 dark:hover:bg-slate-100 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
            
            <button 
                onClick={toggleTheme}
                className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="Toggle Dark Mode"
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="flex items-center md:hidden gap-4">
            <button 
                onClick={toggleTheme}
                className="text-slate-500 dark:text-slate-400"
            >
                 {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 rounded-md text-base font-medium text-center ${
                  link.primary
                    ? 'bg-slate-900 text-white dark:bg-slate-700'
                    : 'text-gray-700 dark:text-slate-200 hover:text-emerald-600 hover:bg-gray-50 dark:hover:bg-slate-800'
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