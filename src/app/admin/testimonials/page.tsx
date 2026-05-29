'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, Check, Star } from 'lucide-react';
import type { Testimonial } from '@/types/admin';

const EMPTY: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'> = {
  author_name: '', author_role: '', content: '', image_url: '', rating: 5, is_active: true,
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = () =>
    fetch('/api/admin/testimonials').then((r) => r.json()).then(setTestimonials).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const method = editing.id ? 'PUT' : 'POST';
    const res = await fetch('/api/admin/testimonials', {
      method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing),
    });
    setSaving(false);
    if (res.ok) { setEditing(null); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    setDeleting(id);
    await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' });
    setDeleting(null);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setEditing({ ...EMPTY })} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">{editing.id ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => setEditing(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Author Name</label>
              <input type="text" value={editing.author_name ?? ''} onChange={(e) => setEditing({ ...editing, author_name: e.target.value })} className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Author Role</label>
              <input type="text" value={editing.author_role ?? ''} onChange={(e) => setEditing({ ...editing, author_role: e.target.value })} className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Content</label>
              <textarea rows={4} value={editing.content ?? ''} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 resize-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Image URL</label>
              <input type="text" value={editing.image_url ?? ''} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button key={r} type="button" onClick={() => setEditing({ ...editing, rating: r })}>
                    <Star className={`w-5 h-5 ${r <= (editing.rating ?? 5) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                  </button>
                ))}
              </div>
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
      ) : testimonials.length === 0 ? (
        <div className="text-center py-16 text-slate-500">No testimonials yet.</div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-start gap-4">
                {t.image_url && <img src={t.image_url} alt={t.author_name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-white">{t.author_name}</p>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
                    </div>
                    {!t.is_active && <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">Hidden</span>}
                  </div>
                  {t.author_role && <p className="text-xs text-slate-400">{t.author_role}</p>}
                  <p className="text-sm text-slate-300 mt-2">{t.content}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => setEditing(t)} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => remove(t.id)} disabled={deleting === t.id} className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    {deleting === t.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}