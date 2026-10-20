'use client';

import { useTransition } from 'react';
import { updateRequestStatus, updateBookingStatus } from '@/lib/admin/actions';
import { Loader2 } from 'lucide-react';

const REQUEST_STATUSES = [
  { value: 'NEW', label: 'جدید' },
  { value: 'IN_PROGRESS', label: 'در حال پیگیری' },
  { value: 'DONE', label: 'تکمیل شده' },
] as const;

const BOOKING_STATUSES = [
  { value: 'PENDING', label: 'در انتظار' },
  { value: 'CONFIRMED', label: 'تایید شده' },
  { value: 'CANCELLED', label: 'لغو شده' },
] as const;

// سلول تغییر وضعیت درخواست مشاوره
export function RequestStatusCell({ id, status }: { id: string; status: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <span className="inline-flex items-center gap-1.5">
      <select
        value={status}
        disabled={pending}
        onChange={(e) =>
          startTransition(() => updateRequestStatus(id, e.target.value as 'NEW' | 'IN_PROGRESS' | 'DONE'))
        }
        className="rounded-lg border border-navy-200 px-2.5 py-1.5 text-xs bg-white"
        aria-label="تغییر وضعیت درخواست"
      >
        {REQUEST_STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      {pending && <Loader2 className="w-3.5 h-3.5 animate-spin text-teal" />}
    </span>
  );
}

// سلول تغییر وضعیت رزرو
export function BookingStatusCell({ id, status }: { id: string; status: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <span className="inline-flex items-center gap-1.5">
      <select
        value={status}
        disabled={pending}
        onChange={(e) =>
          startTransition(() => updateBookingStatus(id, e.target.value as 'PENDING' | 'CONFIRMED' | 'CANCELLED'))
        }
        className="rounded-lg border border-navy-200 px-2.5 py-1.5 text-xs bg-white"
        aria-label="تغییر وضعیت رزرو"
      >
        {BOOKING_STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      {pending && <Loader2 className="w-3.5 h-3.5 animate-spin text-teal" />}
    </span>
  );
}
