import { Link } from 'react-router-dom';
import { Globe, Share2, Users, MapPin, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  
  const affiliations = [
    { name: 'AICTE', src: '/logos/affiliations/aicte.png', fallback: 'AICTE' },
    { name: 'VTU', src: '/logos/affiliations/vtu.png', fallback: 'VTU' },
    { name: 'NBA', src: '/logos/affiliations/nba.png', fallback: 'NBA' },
    { name: 'NAAC', src: '/logos/affiliations/naac.png', fallback: 'NAAC' },
  ];

  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 mt-auto transition-colors duration-300">
      {/* Affiliations Section */}
      <div className="border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h3 className="text-center text-sm font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase mb-8">
            Our Affiliations & Approvals
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {affiliations?.map((logo) => (
              <div 
                key={logo.name}
                className="group relative flex items-center justify-center w-32 h-16 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110"
              >
                <img
                  src={logo.src}
                  alt={`${logo.name} Logo`}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 items-center justify-center font-bold text-xl text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:text-blue-400 transition-colors">
                  {logo.fallback}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* 1. About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={theme === 'dark' ? '/logos/college/logo-white.png' : '/logos/college/logo.png'} 
                alt="HKBK College Logo" 
                className="h-8 w-auto object-contain hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://placehold.co/200x50/2563eb/ffffff?text=HKBK+Logo";
                }}
              />
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              The official alumni network of HKBK College of Engineering. Fostering lifelong connections, mentorship, and career growth among our global graduate community.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/" className="hover:text-blue-600 dark:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/directory" className="hover:text-blue-600 dark:text-blue-400 transition-colors">Alumni Directory</Link></li>
              <li><Link to="/jobs" className="hover:text-blue-600 dark:text-blue-400 transition-colors">Job Portal</Link></li>
              <li><Link to="/events" className="hover:text-blue-600 dark:text-blue-400 transition-colors">Events & Reunions</Link></li>
            </ul>
          </div>

          {/* 3. Contact */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>HKBK College of Engineering<br/>22/1, Nagawara, Arabic College Post<br/>Bengaluru, Karnataka 560045</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <a href="mailto:alumni@hkbk.edu.in" className="hover:text-blue-600 dark:text-blue-400 transition-colors">alumni@hkbk.edu.in</a>
              </li>
            </ul>
          </div>

          {/* 4. Social Media */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-[#0A66C2] hover:text-white transition-all duration-300 hover:-translate-y-1">
                <Users className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-[#E4405F] hover:text-white transition-all duration-300 hover:-translate-y-1">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 hover:-translate-y-1">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} HKBK College of Engineering. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-gray-900 dark:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-gray-900 dark:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
