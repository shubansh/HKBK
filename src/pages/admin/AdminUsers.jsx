import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Check, X, Shield, GraduationCap, User, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('requests'); // 'requests' or 'all'

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setUsers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateStatus = async (userId, newStatus) => {
    const { error } = await supabase
      .from('profiles')
      .update({ status: newStatus })
      .eq('id', userId);
    
    if (!error) {
      toast.success(`User marked as ${newStatus}`);
      fetchUsers();
    } else {
      toast.error('Failed to update status');
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);
    
    if (!error) {
      toast.success(`Role updated to ${newRole}`);
      fetchUsers();
    } else {
      toast.error('Failed to update role');
    }
  };

  if (loading) return <div>Loading users...</div>;

  const pendingAlumni = users.filter(u => u.role === 'alumni' && u.status === 'pending');
  const displayedUsers = activeTab === 'requests' ? pendingAlumni : users;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'requests' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
          >
            <Clock className="w-4 h-4" />
            Alumni Requests
            {pendingAlumni.length > 0 && (
              <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 py-0.5 px-2 rounded-full text-xs">
                {pendingAlumni.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
          >
            <Users className="w-4 h-4" />
            All Users
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-700">
                <th className="p-4 font-semibold text-gray-900 dark:text-white text-sm">User Details</th>
                <th className="p-4 font-semibold text-gray-900 dark:text-white text-sm">Role</th>
                <th className="p-4 font-semibold text-gray-900 dark:text-white text-sm">Status</th>
                <th className="p-4 font-semibold text-gray-900 dark:text-white text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-gray-900 dark:text-white">{user.full_name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {user.role === 'admin' && <Shield className="w-4 h-4 text-purple-500" />}
                      {user.role === 'alumni' && <GraduationCap className="w-4 h-4 text-blue-500" />}
                      {user.role === 'student' && <User className="w-4 h-4 text-green-500" />}
                      {activeTab === 'all' ? (
                        <select 
                          value={user.role} 
                          onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                          className="bg-transparent border border-gray-200 dark:border-slate-600 rounded p-1 text-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="student">Student</option>
                          <option value="alumni">Alumni</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        <span className="text-sm font-medium capitalize">{user.role}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      user.status === 'approved' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' :
                      user.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' :
                      'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800'
                    }`}>
                      {user.status || 'pending'}
                    </span>
                  </td>
                  <td className="p-4">
                    {user.status === 'pending' && user.role === 'alumni' ? (
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleUpdateStatus(user.id, 'approved')}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors text-sm font-medium"
                        >
                          <Check className="w-4 h-4" /> Approve
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(user.id, 'rejected')}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors text-sm font-medium"
                        >
                          <X className="w-4 h-4" /> Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400">No actions required</span>
                    )}
                  </td>
                </tr>
              ))}
              {displayedUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500 dark:text-gray-400">
                    {activeTab === 'requests' ? 'No pending alumni requests.' : 'No users found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
