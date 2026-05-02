import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, GraduationCap, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // 1. Sign up user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      toast.error(signUpError.message);
      setLoading(false);
      return;
    }

    if (data?.user) {
      // 2. Create profile entry
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            full_name: fullName,
            role: role,
            status: role === 'alumni' ? 'pending' : 'approved',
            email: email
          }
        ]);

      if (profileError) {
        toast.error(profileError.message);
      } else {
        toast.success(role === 'alumni' ? 'Account created! Waiting for admin approval.' : 'Welcome to HKBK Connect!');
        navigate('/dashboard');
      }
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    // In a real app, you would configure Google OAuth in Supabase dashboard
    toast.error('Google OAuth requires Supabase dashboard configuration first.');
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-slate-900">
      {/* Left side - Image/Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 z-10 opacity-90" />
        <img 
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Campus" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 flex flex-col justify-center p-16 text-white h-full">
          <div className="p-3 bg-white/10 rounded-2xl w-fit backdrop-blur-sm border border-white/20 mb-8">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Join the global <br/> HKBK network.
          </h1>
          <p className="text-xl text-blue-100 max-w-md leading-relaxed">
            Connect with thousands of graduates, unlock exclusive job opportunities, and find lifelong mentorship.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Sign in instead
              </Link>
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 shadow-xl shadow-blue-900/5 rounded-2xl border border-gray-100 dark:border-slate-700">
            <button
              onClick={handleGoogleSignup}
              className="w-full flex justify-center items-center gap-3 py-2.5 px-4 border border-gray-300 dark:border-slate-600 rounded-xl shadow-sm bg-white dark:bg-slate-900 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors mb-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-800 text-gray-500">Or continue with email</span>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSignup}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  I am joining as a...
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm focus:outline-none transition-colors ${role === 'student' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-600 dark:border-blue-500' : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900'}`}>
                    <input type="radio" value="student" checked={role === 'student'} onChange={(e) => setRole(e.target.value)} className="sr-only" />
                    <div className="flex flex-col items-center justify-center w-full">
                      <GraduationCap className={`w-6 h-6 mb-2 ${role === 'student' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
                      <span className={`text-sm font-semibold ${role === 'student' ? 'text-blue-900 dark:text-blue-200' : 'text-gray-900 dark:text-white'}`}>Student</span>
                    </div>
                  </label>
                  <label className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm focus:outline-none transition-colors ${role === 'alumni' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-600 dark:border-blue-500' : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900'}`}>
                    <input type="radio" value="alumni" checked={role === 'alumni'} onChange={(e) => setRole(e.target.value)} className="sr-only" />
                    <div className="flex flex-col items-center justify-center w-full">
                      <Briefcase className={`w-6 h-6 mb-2 ${role === 'alumni' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
                      <span className={`text-sm font-semibold ${role === 'alumni' ? 'text-blue-900 dark:text-blue-200' : 'text-gray-900 dark:text-white'}`}>Alumni</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-shadow"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-shadow"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-shadow"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300 hover:scale-[1.02]"
              >
                {loading ? 'Creating account...' : 'Create account'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
