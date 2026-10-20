'use client';

import { useTransition } from 'react';
import { updateUserRole, toggleUserActive } from '@/lib/admin/actions';
import { ShieldCheck, ShieldOff, Loader2 } from 'lucide-react';

const ROLES: { value: 'USER' | 'EDITOR' | 'ADMIN'; label: string }[] = [
  { value: 'USER', label: 'کاربر' },
  { value: 'EDITOR', label: 'ویراستار' },
  { value: 'ADMIN', label: 'مدیر اصلی' },
];

// سلول تغییر نقش — Server Action مستقیم از کلاینت
export function UserRoleCell({
  userId,
  role,
  canEdit,
}: {
  userId: string;
  role: string;
  canEdit: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <span className="inline-flex items-center gap-1.5">
      <select
        value={role}
        disabled={!canEdit || pending}
        onChange={(e) =>
          startTransition(() => updateUserRole(userId, e.target.value as 'USER' | 'EDITOR' | 'ADMIN'))
        }
        className="rounded-lg border border-navy-200 px-2.5 py-1.5 text-xs bg-white disabled:opacity-50"
        aria-label="تغییر نقش کاربر"
      >
        {ROLES.map((r) => (
          <option key={r.value} value={r.value}>{r.label}</option>
        ))}
      </select>
      {pending && <Loader2 className="w-3.5 h-3.5 animate-spin text-teal" />}
    </span>
  );
}

// سلول فعال/غیرفعال
export function UserActiveCell({
  userId,
  isActive,
  canEdit,
}: {
  userId: string;
  isActive: boolean;
  canEdit: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      disabled={!canEdit || pending}
      onClick={() => startTransition(() => toggleUserActive(userId))}
      className="btn-ghost p-2 disabled:opacity-40"
      title={isActive ? 'غیرفعال‌سازی کاربر' : 'فعال‌سازی کاربر'}
    >
      {pending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isActive ? (
        <ShieldOff className="w-4 h-4 text-red-400" />
      ) : (
        <ShieldCheck className="w-4 h-4 text-teal" />
      )}
    </button>
  );
}
