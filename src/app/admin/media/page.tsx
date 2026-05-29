'use client';

import { useEffect, useState, useRef } from 'react';
import { Upload, Trash2, Copy, Loader2, Check } from 'lucide-react';
import type { Media } from '@/types/admin';

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () =>
    fetch('/api/admin/media').then((r) => r.json()).then(setMedia).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('alt_text', file.name);
    await fetch('/api/admin/media', { method: 'POST', body: fd });
    setUploading(false);
    load();
    if (fileRef.current) fileRef.current.value = '';
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this file?')) return;
    setDeleting(id);
    await fetch(`/api/admin/media?id=${id}`, { method: 'DELETE' });
    setDeleting(null);
    load();
  };

  const copy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-xl p-10 text-center cursor-pointer transition-colors group"
      >
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        {uploading ? (
          <Loader2 className="w-8 h-8 animate-spin text-emerald-400 mx-auto" />
        ) : (
          <>
            <Upload className="w-8 h-8 text-slate-500 group-hover:text-emerald-400 mx-auto mb-3 transition-colors" />
            <p className="text-sm text-slate-400">Click to upload image</p>
            <p className="text-xs text-slate-600 mt-1">JPG, PNG, WebP, GIF, SVG — max 5MB</p>
          </>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {media.map((m) => (
            <div key={m.id} className="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <img src={m.url} alt={m.alt_text ?? ''} className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => copy(m.url, m.id)}
                  className="p-2 bg-slate-800 rounded-lg text-slate-300 hover:text-white"
                  title="Copy URL"
                >
                  {copied === m.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => remove(m.id)}
                  disabled={deleting === m.id}
                  className="p-2 bg-slate-800 rounded-lg text-red-400 hover:text-red-300"
                  title="Delete"
                >
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