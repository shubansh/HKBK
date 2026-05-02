import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Calendar, MapPin, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '' });
  const [imageFile, setImageFile] = useState(null);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    
    if (!error && data) {
      setEvents(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast.error('You must be logged in.');
      setIsSubmitting(false);
      return;
    }

    let imageUrl = null;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('event-images')
        .upload(filePath, imageFile);

      if (uploadError) {
        toast.error(`Image upload failed: ${uploadError.message}. Make sure the 'event-images' bucket exists and is public.`);
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from('event-images')
          .getPublicUrl(filePath);
        imageUrl = publicUrl;
      }
    }

    const { error } = await supabase
      .from('events')
      .insert([{ ...newEvent, organizer_id: session.user.id, image_url: imageUrl }]);
    
    if (!error) {
      toast.success('Event created successfully!');
      setIsCreating(false);
      setNewEvent({ title: '', description: '', date: '', location: '' });
      setImageFile(null);
      fetchEvents();
    } else {
      toast.error(error.message);
    }
    setIsSubmitting(false);
  };

  const handleDeleteEvent = async (eventId) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);
      
      if (!error) {
        toast.success('Event deleted');
        fetchEvents();
      } else {
        toast.error(error.message);
      }
    }
  };

  if (loading) return <div>Loading events...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Events</h1>
        <button 
          onClick={() => setIsCreating(!isCreating)}
          className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          {isCreating ? 'Cancel' : 'Create Event'}
        </button>
      </div>

      {isCreating && (
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Create New Event</h2>
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input 
                required
                type="text" 
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Event Image</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center justify-center w-full h-32 px-4 transition bg-gray-50 dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-600 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                  <span className="flex items-center space-x-2">
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      {imageFile ? imageFile.name : 'Drop image to attach, or browse'}
                    </span>
                  </span>
                  <input type="file" name="file_upload" className="hidden" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea 
                required
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date & Time</label>
                <input 
                  required
                  type="datetime-local" 
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input 
                  required
                  type="text" 
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? 'Saving...' : 'Save Event'}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300">
            {event.image_url ? (
              <div className="w-full h-48 overflow-hidden bg-gray-100 dark:bg-slate-900">
                <img src={event.image_url} alt={event.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-100 dark:bg-slate-900 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-300 dark:text-gray-600" />
              </div>
            )}
            <div className="p-6 flex-1">
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{event.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-3">{event.description}</p>
              
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  {new Date(event.date).toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  {event.location}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-700/50 p-4 border-t border-gray-200 dark:border-slate-700 flex justify-end">
              <button 
                onClick={() => handleDeleteEvent(event.id)}
                className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-md flex items-center gap-2 transition-colors text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl">
            No events scheduled. Create one above!
          </div>
        )}
      </div>
    </div>
  );
}
