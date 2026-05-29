'use client';

import { useEffect, useState } from 'react';
import { Save, Loader2 } from 'lucide-react';

const PAGES = ['/', '/about', '/programs', '/team', '/events', '/blog', '/contact'];

export default function SeoPage() {
  const [records, setRecords] = useState<Record<string, any>>({});
  const [active, setActive] = useState('/');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/seo')
      .then((r) => r.json())
      .then((data: any[]) => {
        const map: Record<string, any> = {};
        data.forEach((row) => { map[row.page_slug] = row; });
        setRecords(map);
      })
      .finally(() => setLoading(false));
  }, []);

  const current = records[active] ?? { page_slug: active };

  const update = (field: string, val: string) => {
    setRecords({ ...records, [active]: { ...current, [field]: val } });
  };

  const save = async () => {
    setSaving(true);
    await fetch('/api/admin/seo', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(records[active] ?? { page_slug: active }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fields = [
    { key: 'meta_title',       label: 'Meta Title',       hint: 'Max 60 chars' },
    { key: 'meta_description', label: 'Meta Description', hint: 'Max 160 chars', multiline: true },
    { key: 'og_title',         label: 'OG Title',         hint: 'Open Graph' },
    { key: 'og_description',   label: 'OG Description',   hint: 'Open Graph', multiline: true },
    { key: 'og_image_url',     label: 'OG Image URL',     hint: 'Absolute URL' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Tabs */}
      <div className="flex gap-2 flex-wrap">
        {PAGES.map((slug) => (
          <button
            key={slug}
            onClick={() => setActive(slug)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              active === slug
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {slug}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-semibold text-slate-300">
            SEO settings for <span className="font-mono text-emerald-400">{active}</span>
          </h3>

          {fields.map(({ key, label, hint, multiline }) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">{label}</label>
                <span className="text-xs text-slate-500">{hint}</span>
              </div>
              {multiline ? (
                <textarea
                  rows={3}
                  value={current[key] ?? ''}
                  onChange={(e) => update(key, e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 resize-none"
                />
              ) : (
                <input
                  type="text"
                  value={current[key] ?? ''}
                  onChange={(e) => update(key, e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                />
              )}
            </div>
          ))}

          <div className="flex justify-end">
            <button
              onClick={save}
              disabled={saving}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                saved ? 'bg-emerald-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saved ? 'Saved!' : 'Save SEO'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}