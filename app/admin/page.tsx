import { Newspaper, Users, Handshake, CalendarCheck2, Eye } from 'lucide-react';
import { db } from '@/lib/db';
import { DASHBOARD_CHART_MOCK } from '@/lib/constants';
import { toFaDigits } from '@/lib/utils';
import VisitsChart from '@/components/admin/VisitsChart';
import StatusBadge from '@/components/admin/StatusBadge';

export default async function AdminDashboardPage() {
  // آمار داشبورد (با fallback در نبود دیتابیس)
  let stats = { posts: 0, users: 0, requests: 0, bookings: 0, views: 0 };
  let recentRequests: {
    id: string; name: string; field: string; status: string; createdAt: Date;
  }[] = [];
  try {
    const [posts, users, requests, bookings, viewsAgg, recent] = await Promise.all([
      db.post.count(),
      db.user.count(),
      db.consultationRequest.count({ where: { status: 'NEW' } }),
      db.booking.count({ where: { status: 'PENDING' } }),
      db.post.aggregate({ _sum: { views: true } }),
      db.consultationRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    ]);
    stats = { posts, users, requests, bookings, views: viewsAgg._sum.views ?? 0 };
    recentRequests = recent;
  } catch {
    // دیتابیس هنوز راه‌اندازی نشده
  }

  const cards = [
    { label: 'مقالات', value: stats.posts, icon: Newspaper },
    { label: 'کاربران', value: stats.users, icon: Users },
    { label: 'درخواست‌های جدید', value: stats.requests, icon: Handshake },
    { label: 'رزروهای در انتظار', value: stats.bookings, icon: CalendarCheck2 },
    { label: 'مجموع بازدید مقالات', value: stats.views, icon: Eye },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-navy dark:text-white">داشبورد</h1>

      {/* کارت‌های آمار */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="card !shadow-soft p-5">
            <span className="w-10 h-10 rounded-xl bg-teal-50 text-teal flex items-center justify-center mb-3">
              <c.icon className="w-5 h-5" />
            </span>
            <p className="text-2xl font-bold text-navy tabular-nums">{toFaDigits(c.value)}</p>
            <p className="text-sm text-navy-300 mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* نمودار بازدید */}
        <div className="card p-6">
          <h2 className="font-bold text-navy mb-4">روند بازدید سایت (۶ ماه اخیر)</h2>
          <VisitsChart data={DASHBOARD_CHART_MOCK} />
        </div>

        {/* آخرین درخواست‌ها */}
        <div className="card p-6">
          <h2 className="font-bold text-navy mb-4">آخرین درخواست‌های مشاوره</h2>
          {recentRequests.length === 0 ? (
            <p className="text-sm text-navy-300 py-8 text-center">
              درخواستی ثبت نشده است. (در صورت اتصال نبودن به دیتابیس، این بخش خالی است)
            </p>
          ) : (
            <ul className="divide-y divide-navy-100">
              {recentRequests.map((r) => (
                <li key={r.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-navy text-sm">{r.name}</p>
                    <p className="text-xs text-navy-300">{r.field}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}


