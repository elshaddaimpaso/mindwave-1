'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, Check } from 'lucide-react';
import type { BlogPost } from '@/types/admin';

const EMPTY: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'> = {
  title: '', slug: '', excerpt: '', content: '', cover_url: '', author: '', is_published: false, published_at: null,
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = () =>
    fetch('/api/admin/blog').then((r) => r.json()).then(setPosts).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    // Auto-generate slug from title if slug is empty
    const data = { ...editing };
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    if (data.is_published && !data.published_at) {
      data.published_at = new Date().toISOString();
    }
    const method = data.id ? 'PUT' : 'POST';
    const res = await fetch('/api/admin/blog', {
      method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
    });
    setSaving(false);
    if (res.ok) { setEditing(null); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    setDeleting(id);
    await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE' });
    setDeleting(null);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setEditing({ ...EMPTY })} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">{editing.id ? 'Edit Article' : 'New Article'}</h3>
              <button onClick={() => setEditing(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Title</label>
              <input type="text" value={editing.title ?? ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Slug</label>
              <input type="text" value={editing.slug ?? ''} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Excerpt</label>
              <textarea rows={2} value={editing.excerpt ?? ''} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 resize-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Content</label>
              <textarea rows={6} value={editing.content ?? ''} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 resize-none font-mono" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Cover Image URL</label>
              <input type="text" value={editing.cover_url ?? ''} onChange={(e) => setEditing({ ...editing, cover_url: e.target.value })} className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Author</label>
              <input type="text" value={editing.author ?? ''} onChange={(e) => setEditing({ ...editing, author: e.target.value })} className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="published" checked={editing.is_published ?? false} onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })} className="rounded border-slate-600" />
              <label htmlFor="published" className="text-sm text-slate-300">Published</label>
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
      ) : posts.length === 0 ? (
        <div className="text-center py-16 text-slate-500">No articles yet.</div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center gap-4">
              {post.cover_url && <img src={post.cover_url} alt={post.title} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-white truncate">{post.title}</p>
                  {post.is_published ? (
                    <span className="text-xs bg-emerald-600/20 text-emerald-400 px-2 py-0.5 rounded-full">Published</span>
                  ) : (
                    <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">Draft</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span>{post.slug}</span>
                  {post.author && <span>by {post.author}</span>}
                </div>
                {post.excerpt && <p className="text-sm text-slate-400 mt-1 line-clamp-1">{post.excerpt}</p>}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditing(post)} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => remove(post.id)} disabled={deleting === post.id} className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                  {deleting === post.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}