import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Users, Search, GraduationCap } from 'lucide-react';
import { Skeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import toast from 'react-hot-toast';

export default function MentorshipPage() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchMentors() {
      // Fetch alumni who are approved
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'alumni')
        .eq('status', 'approved');
      
      if (!error && data) {
        setMentors(data);
      }
      setLoading(false);
    }
    fetchMentors();
  }, []);

  const handleRequestMentorship = async (mentorId) => {
    // In a full app, this would insert a request into a mentorship_requests table
    toast.success('Mentorship request sent! They will contact you if available.', {
      icon: '🎓'
    });
  };

  const filteredMentors = mentors.filter(m => 
    m.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Find a Mentor</h1>
          <p className="text-gray-500 dark:text-gray-400">Connect with experienced alumni for guidance.</p>
        </div>
        
        <div className="relative w-full md:w-80 group">
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
            <div key={i} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center text-center">
              <Skeleton className="w-24 h-24 rounded-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-6" />
              <div className="w-full space-y-2 mb-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mx-auto" />
              </div>
              <Skeleton className="h-10 w-full rounded-md mt-auto" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 hover:border-[hsl(var(--primary))] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-gray-400 mb-4 overflow-hidden group-hover:ring-4 group-hover:ring-blue-100 dark:ring-blue-900/50 transition-all">
                {mentor.avatar_url ? (
                  <img src={mentor.avatar_url} alt={mentor.full_name} className="w-full h-full object-cover" />
                ) : (
                  <GraduationCap className="w-12 h-12 group-hover:text-blue-600 dark:text-blue-400 transition-colors" />
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:text-blue-400 transition-colors">{mentor.full_name}</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">{mentor.job_title || 'Professional'} {mentor.company && `at ${mentor.company}`}</p>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-3">
                {mentor.bio || "Available for career guidance, resume review, and interview preparation."}
              </p>
              
              <button 
                onClick={() => handleRequestMentorship(mentor.id)}
                className="mt-auto w-full bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-medium py-2 rounded-md hover:bg-gray-100 dark:bg-slate-700 hover:scale-[1.02] transition-all duration-300"
              >
                Request Mentorship
              </button>
            </div>
          ))}
          {filteredMentors.length === 0 && (
            <div className="col-span-full">
              <EmptyState 
                icon={Users}
                title="No mentors found"
                description={searchTerm ? `We couldn't find anyone matching "${searchTerm}". Try a different search term.` : "There are currently no mentors available."}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
