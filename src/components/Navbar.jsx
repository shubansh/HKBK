import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Directory', path: '/directory' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Events', path: '/events' },
  ];

  return (
    <nav className="border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl group-hover:scale-105 transition-transform duration-300">
                <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">HKBK Connect</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-blue-600 dark:text-blue-400 relative group ${
                  location.pathname === link.path ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-6 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-500 transform origin-left transition-transform duration-300 ${
                  location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}
            
            <div className="flex items-center gap-4 border-l border-gray-200 dark:border-slate-700 pl-8">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-blue-600 dark:bg-blue-500 text-white font-medium hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-sm"
              >
                Portal Login
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 dark:text-white p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 dark:bg-slate-900">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:bg-slate-700"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 dark:bg-blue-500 text-white mt-4"
              onClick={() => setIsOpen(false)}
            >
              Portal Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
