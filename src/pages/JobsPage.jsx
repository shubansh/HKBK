import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Briefcase, MapPin, Building2, ExternalLink, Loader2 } from 'lucide-react';
import { Skeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';
import toast from 'react-hot-toast';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', company: '', location: '', description: '', link: '' });

  useEffect(() => {
    async function fetchData() {
      // Get user profile
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        setUserProfile(data);
      }

      // Get approved jobs
      const { data: jobsData, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (!error && jobsData) {
        setJobs(jobsData);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handlePostJob = async (e) => {
    e.preventDefault();
    if (!userProfile) return;
    
    setIsSubmitting(true);
    const { error } = await supabase
      .from('jobs')
      .insert([{ 
        ...newJob, 
        posted_by: userProfile.id,
        status: 'pending' // Admin must approve
      }]);
    
    setIsSubmitting(false);
    if (!error) {
      setIsPosting(false);
      setNewJob({ title: '', company: '', location: '', description: '', link: '' });
      toast.success('Job posted successfully! It will appear once approved by an admin.');
    } else {
      toast.error('Error posting job: ' + error.message);
    }
  };

  const canPostJob = userProfile?.role === 'alumni' && userProfile?.status === 'approved';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Job Board</h1>
          <p className="text-gray-500 dark:text-gray-400">Exclusive opportunities from our alumni network.</p>
        </div>
        {canPostJob && (
          <button 
            onClick={() => setIsPosting(!isPosting)}
            className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-sm"
          >
            {isPosting ? 'Cancel' : 'Post a Job'}
          </button>
        )}
      </div>

      {isPosting && canPostJob && (
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 mb-8 shadow-md transition-all duration-300 transform scale-100 opacity-100">
          <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
          <form onSubmit={handlePostJob} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <input required type="text" value={newJob.title} onChange={(e) => setNewJob({...newJob, title: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <input required type="text" value={newJob.company} onChange={(e) => setNewJob({...newJob, company: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input required type="text" value={newJob.location} onChange={(e) => setNewJob({...newJob, location: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Application Link (Optional)</label>
                <input type="url" value={newJob.link} onChange={(e) => setNewJob({...newJob, link: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea required value={newJob.description} onChange={(e) => setNewJob({...newJob, description: e.target.value})} rows={4} className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-md font-medium hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-3 flex-1">
                <Skeleton className="h-6 w-1/3" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 hover:border-[hsl(var(--primary))] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:text-blue-400 transition-colors">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" /> {job.company}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" /> {job.location}</span>
                </div>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{job.description}</p>
              </div>
              <div className="flex-shrink-0">
                {job.link ? (
                  <a href={job.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:bg-slate-700 hover:scale-105 transition-all duration-300">
                    Apply <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:bg-slate-700 hover:scale-105 transition-all duration-300">
                    Contact Poster
                  </button>
                )}
              </div>
            </div>
          ))}
          {jobs.length === 0 && (
            <EmptyState 
              icon={Briefcase}
              title="No jobs available"
              description="There are currently no job postings available. Please check back later."
              action={canPostJob ? (
                <button 
                  onClick={() => setIsPosting(true)}
                  className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity mt-4"
                >
                  Post the first job
                </button>
              ) : null}
            />
          )}
        </div>
      )}
    </div>
  );
}
