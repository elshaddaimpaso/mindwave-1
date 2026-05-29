'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, Check } from 'lucide-react';
import type { Event } from '@/types/admin';

const EMPTY: Omit<Event, 'id' | 'created_at' | 'updated_at'> = {
  title: '', description: '', location: '', event_date: '', image_url: '', is_active: true,
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Event> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = () =>
    fetch('/api/admin/events').then((r) => r.json()).then(setEvents).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const method = editing.id ? 'PUT' : 'POST';
    const res = await fetch('/api/admin/events', {
      method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing),
    });
    setSaving(false);
    if (res.ok) { setEditing(null); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    setDeleting(id);
    await fetch(`/api/admin/events?id=${id}`, { method: 'DELETE' });
    setDeleting(null);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setEditing({ ...EMPTY })} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">{editing.id ? 'Edit Event' : 'Add Event'}</h3>
              <button onClick={() => setEditing(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Title</label>
              <input type="text" value={editing.title ?? ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
              <textarea rows={3} value={editing.description ?? ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 resize-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
              <input type="text" value={editing.location ?? ''} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Event Date</label>
              <input type="datetime-local" value={editing.event_date ? editing.event_date.slice(0, 16) : ''} onChange={(e) => setEditing({ ...editing, event_date: e.target.value ? new Date(e.target.value).toISOString() : '' })} className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Image URL</label>
              <input type="text" value={editing.image_url ?? ''} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="active" checked={editing.is_active ?? true} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} className="rounded border-slate-600" />
              <label htmlFor="active" className="text-sm text-slate-300">Active</label>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setEditing(null)} className="flex-1 py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white text-sm transition-colors">Cancel</button>
              <button onClick={save} disabled={saving} className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Save
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 className="w-6 h-6 animate-spin text-emerald-400" /></div>
      ) : events.length === 0 ? (
        <div className="text-center py-16 text-slate-500">No events yet.</div>
      ) : (
        <div className="space-y-3">
          {events.map((ev) => (
            <div key={ev.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center gap-4">
              {ev.image_url && <img src={ev.image_url} alt={ev.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-white truncate">{ev.title}</p>
                  {!ev.is_active && <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">Inactive</span>}
                </div>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-400">
                  {ev.event_date && <span>{new Date(ev.event_date).toLocaleDateString()}</span>}
                  {ev.location && <span>{ev.location}</span>}
                </div>
                {ev.description && <p className="text-sm text-slate-400 mt-1 line-clamp-1">{ev.description}</p>}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditing(ev)} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => remove(ev.id)} disabled={deleting === ev.id} className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                  {deleting === ev.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}