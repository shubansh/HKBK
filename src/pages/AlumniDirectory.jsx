import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Search, GraduationCap, Building2, MapPin, Users } from 'lucide-react';
import { Skeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';

export default function AlumniDirectory() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchAlumni() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'alumni')
        .eq('status', 'approved')
        .order('full_name');
      
      if (!error && data) {
        setAlumni(data);
      }
      setLoading(false);
    }
    fetchAlumni();
  }, []);

  const filteredAlumni = alumni.filter(a => 
    a.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Alumni Directory</h1>
          <p className="text-gray-500 dark:text-gray-400">Connect with HKBK graduates around the world.</p>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform group-focus-within:scale-110">
            <Search className="h-5 w-5 text-gray-500 dark:text-gray-400 group-focus-within:text-blue-600 dark:text-blue-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md leading-5 bg-gray-50 dark:bg-slate-900 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all duration-300 shadow-sm hover:shadow-md"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <Skeleton className="w-16 h-16 rounded-full shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              <div className="space-y-3 mt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((person) => (
            <div key={person.id} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 hover:border-[hsl(var(--primary))] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 text-gray-500 dark:text-gray-400 overflow-hidden group-hover:ring-2 group-hover:ring-blue-500 transition-all">
                  {person.avatar_url ? (
                    <img src={person.avatar_url} alt={person.full_name} className="w-full h-full object-cover" />
                  ) : (
                    <GraduationCap className="w-8 h-8 group-hover:text-blue-600 dark:text-blue-400 transition-colors" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:text-blue-400 transition-colors">{person.full_name}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{person.graduation_year ? `Class of ${person.graduation_year}` : 'Alumni'}</p>
                </div>
              </div>
              
              <div className="space-y-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
                {person.company && (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="line-clamp-1">{person.job_title ? `${person.job_title} at ` : ''}{person.company}</span>
                  </div>
                )}
                {person.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="line-clamp-1">{person.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {filteredAlumni.length === 0 && (
            <div className="col-span-full">
              <EmptyState 
                icon={Users}
                title="No alumni found"
                description={searchTerm ? `We couldn't find anyone matching "${searchTerm}". Try a different search term.` : "There are currently no approved alumni in the directory."}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
