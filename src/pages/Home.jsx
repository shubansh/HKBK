import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Users, Briefcase, Calendar, GraduationCap, HeartHandshake, Star, MapPin, Building2, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  usePlatformStats,
  useFeaturedAlumni,
  useFeaturedFaculty,
  useGalleryImages,
  useLatestJobs,
  useUpcomingEvents,
} from '../hooks/useHomeData';

// ─── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { setCount(target); clearInterval(timer); }
        else setCount(Math.floor(start));
      }, 16);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return [count, ref];
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, suffix = '+', color }) {
  const [count, ref] = useCountUp(value);
  return (
    <div ref={ref} className={`relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center group hover:scale-105 transition-transform duration-300`}>
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mx-auto mb-3`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <p className="text-3xl font-black text-white">{count.toLocaleString()}{suffix}</p>
      <p className="text-blue-200 text-sm font-medium mt-1">{label}</p>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ badge, title, highlight, subtitle }) {
  return (
    <div className="text-center mb-12">
      {badge && <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">{badge}</span>}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
        {title}{highlight && <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> {highlight}</span>}
      </h2>
      {subtitle && <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">{subtitle}</p>}
    </div>
  );
}

// ─── Skeleton helpers ─────────────────────────────────────────────────────────
const CardSkeleton = () => (
  <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-14 h-14 rounded-xl bg-gray-200 dark:bg-slate-700 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2" />
      </div>
    </div>
    <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-2/3" />
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Home() {
  const stats                              = usePlatformStats();
  const { alumni,  loading: alumniLoading  } = useFeaturedAlumni(6);
  const { faculty, loading: facultyLoading } = useFeaturedFaculty(6);
  const { images,  loading: galleryLoading } = useGalleryImages(8);
  const { jobs,    loading: jobsLoading    } = useLatestJobs(4);
  const { events,  loading: eventsLoading  } = useUpcomingEvents(3);



  return (
    <div className="flex flex-col overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-8">
                <Sparkles className="w-4 h-4" /> Official Alumni Network · HKBK College
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] mb-6">
                Where{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                  Alumni
                </span>{' '}
                Connect &amp; Inspire
              </h1>
              <p className="text-xl text-blue-200/80 leading-relaxed mb-10 max-w-lg">
                Join thousands of HKBK graduates. Find mentors, discover jobs posted by alumni, attend exclusive events, and build a career network that lasts a lifetime.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup" className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg hover:opacity-90 hover:-translate-y-1 transition-all duration-300 shadow-2xl shadow-blue-600/30">
                  Join the Network <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/directory" className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-all duration-300">
                  Explore Alumni
                </Link>
              </div>
            </div>

            {/* Right: Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard icon={Users}          label="Alumni Members"   value={stats.alumni}  color="bg-blue-600"    />
              <StatCard icon={Briefcase}      label="Jobs Posted"      value={stats.jobs}    color="bg-indigo-600"  />
              <StatCard icon={HeartHandshake} label="Active Mentors"   value={stats.mentors} color="bg-purple-600"  />
              <StatCard icon={Calendar}       label="Events Hosted"    value={stats.events}  color="bg-violet-600"  />
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />
      </section>

      {/* ── FEATURED ALUMNI ──────────────────────────────────────────── */}
      {(alumniLoading || alumni.length > 0) && (
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader badge="Our Network" title="Featured" highlight="Alumni" subtitle="Meet HKBK graduates making an impact across industries worldwide." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {alumniLoading
                ? [...Array(6)].map((_, i) => <CardSkeleton key={i} />)
                : alumni.map(a => (
                  <div key={a.id} className="group relative bg-white dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700/60 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center shrink-0">
                        {a.avatar_url
                          ? <img src={a.avatar_url} alt={a.full_name} className="w-full h-full object-cover" loading="lazy" onError={e => { e.target.onerror=null; e.target.style.display='none'; }} />
                          : <span className="text-xl font-black text-blue-600 dark:text-blue-400">{a.full_name?.charAt(0)}</span>
                        }
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 dark:text-white truncate">{a.full_name}</p>
                        {a.course_name && <p className="text-xs text-blue-600 dark:text-blue-400 font-medium truncate">{a.course_name}</p>}
                      </div>
                    </div>
                    {(a.job_title || a.company) && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Building2 className="w-4 h-4 text-blue-500 shrink-0" />
                        <span className="truncate">{[a.job_title, a.company].filter(Boolean).join(' at ')}</span>
                      </div>
                    )}
                    <Link to="/dashboard/messages" className="absolute inset-0 rounded-2xl" aria-label={`Connect with ${a.full_name}`} />
                  </div>
                ))
              }
            </div>
            <div className="text-center">
              <Link to="/directory" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                View Full Directory <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── JOBS PREVIEW ─────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Opportunities" title="Latest" highlight="Job Postings" subtitle="Exclusive opportunities shared by our alumni network." />
          {jobsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-5 animate-pulse">
                  <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-slate-700 mb-4" />
                  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded mb-2 w-3/4" />
                  <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {jobs.map(job => (
                <div key={job.id} className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/60 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                    <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{job.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 truncate">{job.company}</p>
                  {job.location && (
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-auto pt-3">
                      <MapPin className="w-3 h-3" />{job.location}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400 dark:text-gray-600">
              <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p>No job postings yet. Be the first alumni to post one!</p>
            </div>
          )}
          <div className="text-center">
            <Link to="/jobs" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:opacity-90 transition shadow-lg shadow-blue-500/20">
              View All Jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CAMPUS GALLERY ───────────────────────────────────────────── */}
      {(galleryLoading || images.length > 0) && (
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Our Campus"
              title="Campus"
              highlight="Gallery"
              subtitle="Explore HKBK College through the lens of our community."
            />
            {galleryLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="rounded-2xl bg-gray-200 dark:bg-slate-700 h-48 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map(img => (
                  <div
                    key={img.id}
                    className="group relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800 h-48 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <img
                      src={img.image_url}
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={e => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentElement.classList.add('bg-gray-200', 'dark:bg-slate-700'); }}
                    />
                    {/* Category badge */}
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-xs font-semibold truncate">{img.title}</p>
                      <span className={`inline-block mt-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        img.category === 'events'
                          ? 'bg-rose-500/80 text-white'
                          : 'bg-blue-500/80 text-white'
                      }`}>{img.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── FACULTY / MENTORS ────────────────────────────────────────── */}
      {(facultyLoading || faculty.length > 0) && (
        <section className="py-24 bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader badge="Our Mentors" title="Faculty &" highlight="Mentors" subtitle="Connect with experienced faculty and alumni mentors for career guidance." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {facultyLoading
                ? [...Array(3)].map((_, i) => <CardSkeleton key={i} />)
                : faculty.map(f => {
                const typeMap = { faculty: 'Faculty', alumni_faculty: 'Alumni Faculty', mentor: 'Mentor' };
                const colorMap = { faculty: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', alumni_faculty: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', mentor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' };
                return (
                  <div key={f.id} className="bg-white dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700/60 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center shrink-0">
                        {f.image_url
                          ? <img
                              src={f.image_url}
                              alt={f.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={e => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-blue-500"><svg xmlns=\'http://www.w3.org/2000/svg\' class=\'w-7 h-7\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'><path stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M12 14l9-5-9-5-9 5 9 5z\'/></svg></span>'; }}
                            />
                          : <GraduationCap className="w-7 h-7 text-blue-500" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-bold text-gray-900 dark:text-white truncate">{f.name}</h3>
                          {f.is_featured && <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />}
                        </div>
                        {f.designation && <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{f.designation}</p>}
                        {f.department && <p className="text-xs text-gray-400 truncate">{f.department}</p>}
                      </div>
                    </div>
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${colorMap[f.type] ?? colorMap.faculty}`}>
                      {typeMap[f.type] ?? 'Faculty'}
                    </span>
                    {f.bio && <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 line-clamp-2">{f.bio}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── MENTORSHIP CTA ───────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-6">
            <HeartHandshake className="w-4 h-4" /> Mentorship Program
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">Need Career Guidance?</h2>
          <p className="text-xl text-blue-200/80 mb-10 max-w-2xl mx-auto">
            Connect with alumni who've been in your shoes. Get personalized advice, industry insights, and career roadmaps from experienced professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg hover:opacity-90 hover:-translate-y-1 transition-all shadow-2xl shadow-blue-600/30">
              Find a Mentor <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/signup" className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-all">
              Become a Mentor
            </Link>
          </div>
        </div>
      </section>

      {/* ── EVENTS PREVIEW ───────────────────────────────────────────── */}
      {(eventsLoading || events.length > 0) && (
        <section className="py-24 bg-gray-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader badge="What's On" title="Upcoming" highlight="Events" subtitle="Reunions, tech talks, and networking events — stay connected." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {eventsLoading
                ? [...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 animate-pulse flex gap-5">
                    <div className="w-14 h-14 bg-gray-200 dark:bg-slate-700 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2" />
                    </div>
                  </div>
                ))
                : events.map(ev => {
                const d = new Date(ev.date);
                return (
                  <div key={ev.id} className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/60 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex gap-5">
                    <div className="shrink-0 w-14 text-center">
                      <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{d.getDate()}</p>
                      <p className="text-xs font-semibold text-gray-400 uppercase">{d.toLocaleString('default',{month:'short'})}</p>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 dark:text-white truncate mb-1">{ev.title}</h3>
                      {ev.location && <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 shrink-0" />{ev.location}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <Link to="/events" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                View All Events <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="py-28 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 overflow-hidden shadow-2xl shadow-blue-600/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Join HKBK Alumni Network Today</h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Be part of a thriving community of {stats.alumni > 0 ? stats.alumni.toLocaleString() + '+' : 'thousands of'} alumni. Your next opportunity is one connection away.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/signup" className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-blue-700 font-bold text-lg hover:bg-blue-50 hover:-translate-y-1 transition-all shadow-xl">
                  Get Started Free <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/directory" className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 border border-white/30 text-white font-bold text-lg hover:bg-white/20 transition-all">
                  Explore Platform
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
