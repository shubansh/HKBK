import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  ArrowRight, 
  ChevronRight, 
  Quote, 
  MapPin, 
  Mail, 
  Phone,
  MessageSquare,
  Search,
  ExternalLink,
  Award,
  BookOpen,
  CheckCircle2,
  Trophy,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  useFeaturedAlumni, 
  useFeaturedFaculty, 
  useGalleryImages, 
  useLatestJobs, 
  useUpcomingEvents,
  usePlatformStats 
} from '../hooks/useHomeData';
import { Skeleton } from '../components/Skeleton';
import Carousel from '../components/Carousel';
import Lightbox from '../components/Lightbox';
import Affiliations from '../components/Affiliations';

// ─── Animation Variants ──────────────────────────────────────────────────────
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// ─── Stat Card Component ──────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, value, label, loading }) => (
  <motion.div 
    variants={fadeIn}
    className="bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 p-6 rounded-3xl flex items-center gap-4 group hover:bg-white hover:dark:bg-white/10 transition-all duration-500 shadow-sm hover:shadow-xl"
  >
    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-500">
      {Icon && <Icon className="w-6 h-6" />}
    </div>
    <div>
      {loading ? (
        <Skeleton className="h-8 w-16 mb-1" />
      ) : (
        <div className="text-2xl font-black text-gray-900 dark:text-white">{value}+</div>
      )}
      <div className="text-[10px] font-bold text-gray-400 dark:text-white/50 uppercase tracking-[0.2em]">{label}</div>
    </div>
  </motion.div>
);

export default function Home() {
  const { alumni = [], loading: alumniLoading } = useFeaturedAlumni(8);
  const { faculty = [], loading: facultyLoading } = useFeaturedFaculty(6);
  const { images: gallery = [], loading: galleryLoading } = useGalleryImages(12);
  const { jobs = [], loading: jobsLoading } = useLatestJobs(3);
  const { events = [], loading: eventsLoading } = useUpcomingEvents(3);
  const stats = usePlatformStats() || { alumni: 0, jobs: 0, mentors: 0, events: 0, loading: true };

  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <div className="overflow-x-hidden bg-white dark:bg-[#020617] transition-colors duration-300">
      
      {/* ─── Hero Section ───────────────────────────────────────────────────── */}
      <section className="relative min-h-[95vh] flex items-center pt-28 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent" />
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-10"
            >
              <div className="space-y-4">
                <motion.div variants={fadeIn} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  Official Alumni Network
                </motion.div>
                
                <motion.h1 variants={fadeIn} className="text-6xl md:text-[5.5rem] font-black text-gray-900 dark:text-white leading-[0.95] tracking-tight">
                  Connect. <br />
                  Inspire. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-purple-400">
                    Succeed.
                  </span>
                </motion.h1>
              </div>

              <motion.p variants={fadeIn} className="text-xl text-gray-600 dark:text-white/60 max-w-lg leading-relaxed font-medium">
                Join the HKBK Connect platform to bridge the gap between generations. Access exclusive mentorship, career opportunities, and a global network of 10,000+ graduates.
              </motion.p>

              <motion.div variants={fadeIn} className="flex flex-wrap gap-5 pt-4">
                <Link to="/signup" className="group relative px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-500/20">
                  <span className="relative z-10 flex items-center gap-3">
                    Join Today <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link to="/directory" className="px-10 py-5 bg-white dark:bg-white/5 text-gray-900 dark:text-white font-black rounded-2xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-all shadow-sm">
                  Directory
                </Link>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                <StatCard icon={Users} label="Alumni" value={stats.alumni} loading={stats.loading} />
                <StatCard icon={Briefcase} label="Jobs" value={stats.jobs} loading={stats.loading} />
                <StatCard icon={GraduationCap} label="Mentors" value={stats.mentors} loading={stats.loading} />
                <StatCard icon={Calendar} label="Events" value={stats.events} loading={stats.loading} />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden border-[12px] border-white dark:border-white/5 shadow-2xl transition-all duration-700 aspect-[4/5] group">
                <img 
                  src="/images/hero/main.png" 
                  alt="HKBK Campus" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800" />
                      ))}
                    </div>
                    <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Global Network</p>
                  </div>
                  <p className="text-gray-600 dark:text-white/70 text-sm leading-relaxed font-medium">
                    "HKBK Connect is not just a platform; it's a lifelong partnership for growth and excellence."
                  </p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Affiliations Section ───────────────────────────────────────────── */}
      <Affiliations />

      {/* ─── About HKBK Section (New) ───────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-video lg:aspect-square">
                <img 
                  src="/images/campus/about.png" 
                  alt="College Excellence" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1541339907198-e08756ebafe1?q=80&w=2070&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply" />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                  A Legacy of <span className="text-blue-600 dark:text-blue-400">Academic Excellence.</span>
                </h2>
                <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
              </div>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Established in 1997, HKBK Group of Institutions has been at the forefront of providing quality education in Bengaluru. Our alumni are leaders in Fortune 500 companies and founders of successful startups worldwide.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Trophy, title: "NAAC A+ Accredited", desc: "Highest standards of education" },
                  { icon: Target, title: "Industry Aligned", desc: "Curriculum designed for success" },
                  { icon: CheckCircle2, title: "Global Network", desc: "10,000+ active alumni" },
                  { icon: Award, title: "Award Winning", desc: "Consistently ranked top-tier" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Alumni Spotlight ──────────────────────────────────────────────── */}
      <section className="py-32 bg-gray-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Alumni Spotlight</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg font-medium">
              Hear from our global network of graduates making an impact across industries.
            </p>
          </div>

          {alumniLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-80 rounded-[2.5rem]" />)}
            </div>
          ) : (
            <Carousel 
              items={alumni}
              renderItem={(person) => (
                <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/50 p-8 rounded-[2.5rem] h-full flex flex-col items-center text-center group hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 relative">
                  <Quote className="absolute top-8 left-8 w-12 h-12 text-blue-500/10" />
                  <div className="w-24 h-24 rounded-full p-1 border-2 border-blue-500/30 mb-6 group-hover:scale-110 transition-transform duration-500">
                    <img 
                      src={person?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(person?.full_name || 'User')}&background=0D8ABC&color=fff`} 
                      alt={person?.full_name || 'Alumni'}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{person?.full_name || 'Alumni'}</h3>
                  <p className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
                    {person?.job_title || 'Professional'} @ {person?.company || 'Organization'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4 italic font-medium">
                    "{person?.bio || `Passionate about ${person?.course_name || 'Engineering'} and giving back to the HKBK community. The network here is unmatched.`}"
                  </p>
                </div>
              )}
            />
          )}
        </div>
      </section>

      {/* ─── Campus Gallery ────────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Campus Life</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-xl text-lg font-medium">
                Glimpses of our vibrant campus, state-of-the-art labs, and memorable events.
              </p>
            </div>
            <Link to="/gallery" className="group flex items-center gap-2 text-blue-600 font-black hover:gap-3 transition-all uppercase text-xs tracking-widest">
              View All Moments <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {galleryLoading ? (
            <div className="flex gap-6 overflow-hidden">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="w-[350px] h-[450px] rounded-[2rem] shrink-0" />)}
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-12 custom-scrollbar snap-x no-scrollbar">
              {gallery?.map((img, idx) => (
                <motion.div
                  key={img.id}
                  whileHover={{ y: -10 }}
                  className="min-w-[300px] md:min-w-[400px] h-[500px] rounded-[3rem] overflow-hidden group relative cursor-pointer snap-start border border-gray-100 dark:border-white/5 shadow-xl"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <img 
                    src={img?.image_url} 
                    alt={img?.title || 'Gallery'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-8 left-8 right-8 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="text-xl font-bold text-white mb-2">{img?.title || 'HKBK Moment'}</h4>
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                      {img?.category || 'Campus'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <Lightbox 
          images={gallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(prev => (prev === 0 ? (gallery?.length || 1) - 1 : prev - 1))}
          onNext={() => setLightboxIndex(prev => (prev === (gallery?.length || 1) - 1 ? 0 : prev + 1))}
        />
      </section>

      {/* ─── Faculty & Mentors ─────────────────────────────────────────────── */}
      <section className="py-32 bg-slate-900 text-white rounded-[4rem] mx-4 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            <div className="lg:sticky lg:top-32 h-fit space-y-10">
              <div className="w-20 h-2 bg-blue-600 rounded-full" />
              <h2 className="text-5xl font-black leading-tight tracking-tight">Meet Our <br /> <span className="text-blue-500">Expert Faculty.</span></h2>
              <p className="text-white/50 text-xl font-medium">
                Expert guidance from experienced professionals and dedicated academicians.
              </p>
              <Link to="/mentorship" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-950 font-black rounded-2xl hover:scale-105 transition-transform shadow-2xl shadow-blue-500/20 uppercase text-xs tracking-widest">
                Find a Mentor <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="lg:col-span-2">
              {facultyLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-64 rounded-[2.5rem] opacity-20" />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {faculty?.map((member, i) => (
                    <motion.div
                      key={member.id}
                      initial="hidden"
                      whileInView="visible"
                      variants={fadeIn}
                      custom={i}
                      viewport={{ once: true }}
                      className="bg-white/5 border border-white/10 p-10 rounded-[3rem] flex flex-col items-center text-center group hover:bg-white/10 transition-all duration-500"
                    >
                      <div className="relative mb-8">
                        <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
                          <img 
                            src={member?.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member?.name || 'Faculty')}&background=6366f1&color=fff`} 
                            alt={member?.name || 'Faculty'}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        {member?.is_featured && (
                          <div className="absolute -top-3 -right-3 bg-gradient-to-tr from-yellow-400 to-orange-500 text-slate-950 p-2.5 rounded-2xl shadow-2xl">
                            <Award className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-2xl font-black mb-2 tracking-tight">{member?.name || 'Faculty Member'}</h3>
                      <p className="text-blue-400 font-black text-xs uppercase tracking-[0.2em] mb-3">{member?.role || 'Professor'}</p>
                      <p className="text-white/40 text-sm font-medium mb-8">{member?.department || 'Department of Engineering'}</p>
                      <div className="mt-auto flex gap-3">
                        <span className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                          {member?.role?.includes('HOD') ? 'Leadership' : 'Faculty'}
                        </span>
                        {member?.is_featured && (
                          <span className="px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest">
                            Mentor
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact Section ───────────────────────────────────────────────── */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-[4rem] overflow-hidden relative shadow-2xl shadow-blue-500/20">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2px_2px,_white_1px,_transparent_0)] bg-[size:40px_40px]" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-16 md:p-24 space-y-12 relative z-10">
                <div className="space-y-6">
                  <h2 className="text-5xl font-black text-white tracking-tight leading-none">Let's stay in touch.</h2>
                  <p className="text-blue-100 text-xl font-medium max-w-md leading-relaxed">
                    Have questions about the alumni network or need support? Our team is here to help.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-blue-600 transition-all duration-500">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-white font-black text-xl tracking-tight">Visit Us</p>
                      <p className="text-blue-100/70 font-medium">HKBK Campus, Manyata Tech Park Road, Bengaluru</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-blue-600 transition-all duration-500">
                      <Mail className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-white font-black text-xl tracking-tight">Email Us</p>
                      <p className="text-blue-100/70 font-medium">alumni@hkbk.edu.in</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Link to="/contact" className="px-12 py-6 bg-white text-blue-600 font-black rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 uppercase text-xs tracking-widest">
                    Send a Message <MessageSquare className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[500px] hidden lg:block">
                <img 
                  src="https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop" 
                  alt="Contact HKBK" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-600/20 mix-blend-multiply" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
