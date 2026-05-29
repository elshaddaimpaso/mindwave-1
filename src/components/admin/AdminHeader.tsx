'use client';

import { usePathname } from 'next/navigation';

const pageNames: Record<string, string> = {
  '/admin/dashboard':    'Dashboard',
  '/admin/content':      'Page Content',
  '/admin/programs':     'Programs & Services',
  '/admin/team':         'Team Members',
  '/admin/testimonials': 'Testimonials',
  '/admin/events':       'Events',
  '/admin/blog':         'Blog & Articles',
  '/admin/media':        'Media Library',
  '/admin/seo':          'SEO Settings',
};

export default function AdminHeader() {
  const pathname = usePathname();
  const title = pageNames[pathname] ?? 'Admin';

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30">
      <h1 className="text-base font-semibold text-slate-100">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        <span className="text-xs text-slate-400">Live</span>
      </div>
    </header>
  );
}