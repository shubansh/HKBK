import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, Briefcase, Calendar, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingAlumni: 0,
    activeJobs: 0,
    upcomingEvents: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      // Mock stats for UI since we might not have data yet
      // In a real app, we'd query count from tables
      
      const { count: totalUsers } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { count: pendingAlumni } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('status', 'pending');
      const { count: activeJobs } = await supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'approved');
      
      setStats({
        totalUsers: totalUsers || 0,
        pendingAlumni: pendingAlumni || 0,
        activeJobs: activeJobs || 0,
        upcomingEvents: 0
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  const statCards = [
    { name: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-500' },
    { name: 'Pending Approvals', value: stats.pendingAlumni, icon: CheckCircle, color: 'text-yellow-500' },
    { name: 'Active Jobs', value: stats.activeJobs, icon: Briefcase, color: 'text-green-500' },
    { name: 'Upcoming Events', value: stats.upcomingEvents, icon: Calendar, color: 'text-purple-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Admin Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-gray-100 dark:bg-slate-700 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Use the sidebar to navigate to specific management sections.</p>
        </div>
      </div>
    </div>
  );
}
