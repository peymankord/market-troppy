import Link from 'next/link';
import { db } from '@/lib/db';
import { faDate, toFaDigits, cn } from '@/lib/utils';
import { RequestStatusCell, BookingStatusCell } from '@/components/admin/RequestCells';
import { Handshake, CalendarCheck2 } from 'lucide-react';

export default async function AdminRequestsPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const tab = searchParams.tab === 'bookings' ? 'bookings' : 'requests';

  let requests: {
    id: string; name: string; phone: string; field: string; budget: string | null;
    message: string; status: string; createdAt: Date;
  }[] = [];
  let bookings: {
    id: string; name: string; phone: string; date: Date; timeSlot: string; status: string; createdAt: Date;
  }[] = [];
  try {
    [requests, bookings] = await Promise.all([
      db.consultationRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
      db.booking.findMany({ orderBy: { date: 'asc' }, take: 50 }),
    ]);
  } catch {}

  const tabs = [
    { id: 'requests', label: `درخواست‌های مشاوره (${toFaDigits(requests.length)})`, icon: Handshake },
    { id: 'bookings', label: `رزروهای وقت (${toFaDigits(bookings.length)})`, icon: CalendarCheck2 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy">درخواست‌ها و رزروها</h1>

      {/* تب‌ها */}
      <div className="flex gap-2">
        {tabs.map((t) => (
          <Link
            key={t.id}
            href={`/admin/requests?tab=${t.id}`}
            className={cn(
              'btn px-4 py-2 text-sm rounded-full',
              tab === t.id ? 'bg-navy text-white' : 'bg-white border border-navy-200 text-navy-400 hover:border-teal'
            )}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </Link>
        ))}
      </div>

      {tab === 'requests' ? (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="bg-navy-50/60 text-navy-400 text-right">
                <th className="p-4 font-medium">نام</th>
                <th className="p-4 font-medium">موبایل</th>
                <th className="p-4 font-medium">حوزه فعالیت</th>
                <th className="p-4 font-medium">بودجه</th>
                <th className="p-4 font-medium">پیام</th>
                <th className="p-4 font-medium">تاریخ</th>
                <th className="p-4 font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {requests.length === 0 && (
                <tr><td colSpan={7} className="p-10 text-center text-navy-300">درخواستی ثبت نشده است.</td></tr>
              )}
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-mist align-top">
                  <td className="p-4 font-medium text-navy">{r.name}</td>
                  <td className="p-4 text-navy-400" dir="ltr">{r.phone}</td>
                  <td className="p-4 text-navy-400">{r.field}</td>
                  <td className="p-4 text-navy-400">{r.budget ?? '—'}</td>
                  <td className="p-4 text-navy-400 max-w-xs"><p className="line-clamp-2 leading-6">{r.message}</p></td>
                  <td className="p-4 text-navy-400 whitespace-nowrap">{faDate(r.createdAt)}</td>
                  <td className="p-4"><RequestStatusCell id={r.id} status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="bg-navy-50/60 text-navy-400 text-right">
                <th className="p-4 font-medium">نام</th>
                <th className="p-4 font-medium">موبایل</th>
                <th className="p-4 font-medium">تاریخ جلسه</th>
                <th className="p-4 font-medium">ساعت</th>
                <th className="p-4 font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {bookings.length === 0 && (
                <tr><td colSpan={5} className="p-10 text-center text-navy-300">رزروی ثبت نشده است.</td></tr>
              )}
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-mist">
                  <td className="p-4 font-medium text-navy">{b.name}</td>
                  <td className="p-4 text-navy-400" dir="ltr">{b.phone}</td>
                  <td className="p-4 text-navy-400">{faDate(b.date, { weekday: 'long' })}</td>
                  <td className="p-4 text-navy-400 tabular-nums">{toFaDigits(b.timeSlot)}</td>
                  <td className="p-4"><BookingStatusCell id={b.id} status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
