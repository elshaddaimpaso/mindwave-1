'use client';

import { useEffect, useState } from 'react';
import { Users, Calendar, BookOpen, Image, FileText, TrendingUp } from 'lucide-react';

interface Stats {
  programs: number;
  team: number;
  testimonials: number;
  events: number;
  blog: number;
  media: number;
}

const StatCard = ({
  label, value, icon: Icon, color
}: {
  label: string; value: number; icon: any; color: string;
}) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-slate-400 mb-1">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
  </div>
);

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    programs: 0, team: 0, testimonials: 0, events: 0, blog: 0, media: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tables = ['programs', 'team_members', 'testimonials', 'events', 'blog_posts', 'media'];
    Promise.all(
      tables.map((t) => fetch(`/api/admin/${t === 'team_members' ? 'team' : t === 'blog_posts' ? 'blog' : t}`).then((r) => r.json()))
    ).then(([programs, team, testimonials, events, blog, media]) => {
      setStats({
        programs: Array.isArray(programs) ? programs.length : 0,
        team: Array.isArray(team) ? team.length : 0,
        testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
        events: Array.isArray(events) ? events.length : 0,
        blog: Array.isArray(blog) ? blog.length : 0,
        media: Array.isArray(media) ? media.length : 0,
      });
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-emerald-900/30 to-slate-900 border border-emerald-500/20 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white">Welcome back 👋</h2>
        <p className="text-slate-400 text-sm mt-1">
          Manage all MINDWAVE website content from this dashboard.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Programs" value={stats.programs} icon={FileText} color="bg-emerald-600" />
        <StatCard label="Team Members" value={stats.team} icon={Users} color="bg-blue-600" />
        <StatCard label="Testimonials" value={stats.testimonials} icon={TrendingUp} color="bg-purple-600" />
        <StatCard label="Events" value={stats.events} icon={Calendar} color="bg-orange-600" />
        <StatCard label="Blog Posts" value={stats.blog} icon={BookOpen} color="bg-rose-600" />
        <StatCard label="Media Files" value={stats.media} icon={Image} color="bg-cyan-600" />
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { href: '/admin/content',   label: 'Edit Hero Text' },
            { href: '/admin/programs',  label: 'Add Program' },
            { href: '/admin/team',      label: 'Add Team Member' },
            { href: '/admin/events',    label: 'Create Event' },
            { href: '/admin/blog',      label: 'Write Article' },
            { href: '/admin/seo',       label: 'Update SEO' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="flex items-center justify-center py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}