'use client';

import { useEffect, useState } from 'react';
import { Save, Loader2 } from 'lucide-react';

interface ContentField {
  section: string;
  key: string;
  label: string;
  type?: 'text' | 'textarea';
}

const CONTENT_FIELDS: ContentField[] = [
  // Hero
  { section: 'hero', key: 'badge',     label: 'Hero Badge Text',   type: 'text' },
  { section: 'hero', key: 'title',     label: 'Hero Title',        type: 'textarea' },
  { section: 'hero', key: 'subtitle',  label: 'Hero Subtitle',     type: 'textarea' },
  { section: 'hero', key: 'cta_primary',   label: 'Primary CTA Button',  type: 'text' },
  { section: 'hero', key: 'cta_secondary', label: 'Secondary CTA Button', type: 'text' },
  // About
  { section: 'about', key: 'title',       label: 'About Title',       type: 'text' },
  { section: 'about', key: 'description', label: 'About Description', type: 'textarea' },
  { section: 'about', key: 'mission',     label: 'Mission Statement', type: 'textarea' },
  { section: 'about', key: 'vision',      label: 'Vision Statement',  type: 'textarea' },
  // Footer
  { section: 'footer', key: 'tagline',    label: 'Footer Tagline',    type: 'text' },
  { section: 'footer', key: 'address',    label: 'Address',           type: 'text' },
  { section: 'footer', key: 'email',      label: 'Contact Email',     type: 'text' },
  { section: 'footer', key: 'phone',      label: 'Phone Number',      type: 'text' },
  { section: 'footer', key: 'copyright',  label: 'Copyright Text',    type: 'text' },
  // Contact
  { section: 'contact', key: 'title',       label: 'Contact Page Title', type: 'text' },
  { section: 'contact', key: 'description', label: 'Contact Description', type: 'textarea' },
];

const SECTIONS = [...new Set(CONTENT_FIELDS.map((f) => f.section))];

export default function ContentPage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then((data: any[]) => {
        const map: Record<string, string> = {};
        data.forEach((item) => { map[`${item.section}__${item.key}`] = item.value ?? ''; });
        setContent(map);
      })
      .finally(() => setLoading(false));
  }, []);

  const saveField = async (section: string, key: string) => {
    const fieldKey = `${section}__${key}`;
    setSaving(fieldKey);
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section, key, value: content[fieldKey] ?? '' }),
    });
    setSaving(null);
    if (res.ok) {
      setSaved(fieldKey);
      setTimeout(() => setSaved(null), 2000);
    }
  };

  const fields = CONTENT_FIELDS.filter((f) => f.section === activeSection);

  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex gap-2 flex-wrap">
        {SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setActiveSection(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              activeSection === s
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Fields */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
        </div>
      ) : (
        <div className="space-y-4">
          {fields.map(({ section, key, label, type = 'text' }) => {
            const fieldKey = `${section}__${key}`;
            const isSaving = saving === fieldKey;
            const isSaved = saved === fieldKey;
            return (
              <div key={fieldKey} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
                {type === 'textarea' ? (
                  <textarea
                    rows={4}
                    value={content[fieldKey] ?? ''}
                    onChange={(e) => setContent({ ...content, [fieldKey]: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 resize-none transition-colors"
                  />
                ) : (
                  <input
                    type="text"
                    value={content[fieldKey] ?? ''}
                    onChange={(e) => setContent({ ...content, [fieldKey]: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-colors"
                  />
                )}
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => saveField(section, key)}
                    disabled={isSaving}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSaved
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                    }`}
                  >
                    {isSaving ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Save className="w-3 h-3" />
                    )}
                    {isSaved ? 'Saved!' : 'Save'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}