import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Briefcase, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AlumniDashboard() {
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

  if (profile?.status === 'pending') {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 dark:bg-yellow-900/20 dark:border-yellow-600">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Your alumni account is currently pending approval from an administrator. Some features may be restricted until you are approved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome back, {profile?.full_name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-[hsl(var(--primary))] transition-colors">
          <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-lg font-bold mb-2">Post a Job</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Share opportunities with HKBK students and fellow alumni.</p>
          <Link to="/jobs" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Go to Jobs →</Link>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-[hsl(var(--primary))] transition-colors">
          <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-lg font-bold mb-2">Upcoming Events</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Join reunions and networking events.</p>
          <Link to="/events" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">View Events →</Link>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-[hsl(var(--primary))] transition-colors">
          <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-lg font-bold mb-2">Mentorship</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Guide students in their career journey.</p>
          <Link to="/dashboard/mentorship" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Manage Mentorship →</Link>
        </div>
      </div>
    </div>
  );
}
