'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, Check } from 'lucide-react';
import type { TeamMember } from '@/types/admin';

const EMPTY: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'> = {
  name: '', role: '', bio: '', image_url: '', linkedin: '', twitter: '', order_index: 0, is_active: true,
};

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<TeamMember> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = () =>
    fetch('/api/admin/team').then((r) => r.json()).then(setMembers).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const method = editing.id ? 'PUT' : 'POST';
    const res = await fetch('/api/admin/team', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    });
    setSaving(false);
    if (res.ok) { setEditing(null); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this team member?')) return;
    setDeleting(id);
    await fetch(`/api/admin/team?id=${id}`, { method: 'DELETE' });
    setDeleting(null);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Team Member
        </button>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">{editing.id ? 'Edit Member' : 'Add Member'}</h3>
              <button onClick={() => setEditing(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {(['name', 'role', 'bio', 'image_url', 'linkedin', 'twitter'] as const).map((field) => (
              <div key={field}>
                <label className="block text-xs font-medium text-slate-300 mb-1 capitalize">
                  {field.replace('_', ' ')}
                </label>
                {field === 'bio' ? (
                  <textarea
                    rows={3}
                    value={(editing as any)[field] ?? ''}
                    onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={(editing as any)[field] ?? ''}
                    onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                  />
                )}
              </div>
            ))}

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active"
                checked={editing.is_active ?? true}
                onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
                className="rounded border-slate-600"
              />
              <label htmlFor="active" className="text-sm text-slate-300">Active</label>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setEditing(null)} className="flex-1 py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white text-sm transition-colors">Cancel</button>
              <button onClick={save} disabled={saving} className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
        </div>
      ) : members.length === 0 ? (
        <div className="text-center py-16 text-slate-500">No team members yet.</div>
      ) : (
        <div className="space-y-3">
          {members.map((m) => (
            <div key={m.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center gap-4">
              {m.image_url && <img src={m.image_url} alt={m.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-white truncate">{m.name}</p>
                  {!m.is_active && <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">Inactive</span>}
                </div>
                {m.role && <p className="text-sm text-slate-400 mt-0.5">{m.role}</p>}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditing(m)} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => remove(m.id)} disabled={deleting === m.id} className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                  {deleting === m.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}