import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Briefcase, Users, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome, {profile?.full_name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-[hsl(var(--primary))] transition-colors">
          <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-lg font-bold mb-2">Find a Job</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Explore job opportunities posted by alumni.</p>
          <Link to="/jobs" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">View Jobs →</Link>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-[hsl(var(--primary))] transition-colors">
          <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-lg font-bold mb-2">Find a Mentor</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Connect with alumni for guidance.</p>
          <Link to="/dashboard/mentorship" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Find Mentors →</Link>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-[hsl(var(--primary))] transition-colors">
          <Search className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-lg font-bold mb-2">Alumni Directory</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Search and connect with past graduates.</p>
          <Link to="/directory" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Browse Directory →</Link>
        </div>
      </div>
    </div>
  );
}
