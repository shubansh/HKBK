import { ArrowRight, Users, Briefcase, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const galleryImages = [
    'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1577416412292-747c6607f055?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm">
            Empowering the HKBK Community
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">HKBK Connect</span>
          </h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            The official alumni network of HKBK College of Engineering. Connect with graduates, find mentorship, and explore career opportunities worldwide.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup" className="px-8 py-3 rounded-xl bg-blue-600 dark:bg-blue-500 text-white font-semibold hover:opacity-90 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
              Join the Network <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/directory" className="px-8 py-3 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-300 flex items-center justify-center">
              Explore Directory
            </Link>
          </div>
        </div>
      </section>

      {/* College Section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About Our College</h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                Established with a vision to impart quality technical education, HKBK College of Engineering has grown into a premier institution known for academic excellence and innovation. Our campus provides a vibrant environment for holistic development, preparing students to meet global challenges.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-900 dark:text-gray-300">
                  <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  State-of-the-art campus in the heart of Bengaluru
                </li>
                <li className="flex items-center gap-3 text-gray-900 dark:text-gray-300">
                  <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <Users className="w-5 h-5" />
                  </div>
                  Vibrant network of thousands of successful alumni
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.map((src, index) => (
                <div 
                  key={index} 
                  className={`relative overflow-hidden rounded-2xl group ${index === 0 ? 'col-span-2 aspect-[21/9]' : 'aspect-square'}`}
                >
                  <img 
                    src={src} 
                    alt="Campus View" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Platform Features</h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Everything you need to stay connected and grow your career.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Alumni Directory</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">Connect with thousands of HKBK graduates across the globe. Find old friends or build new professional contacts.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Exclusive Job Portal</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">Access job postings shared exclusively by alumni. Post opportunities from your company or find your next career move.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Events & Reunions</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">Stay updated with college events, tech talks, workshops, and alumni reunions happening near you.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
