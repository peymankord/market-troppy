// نشان وضعیت — در صفحات پنل مدیریت استفاده می‌شود
export default function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    NEW: { label: 'جدید', cls: 'bg-teal-50 text-teal' },
    IN_PROGRESS: { label: 'در حال پیگیری', cls: 'bg-amber-50 text-amber-600' },
    DONE: { label: 'تکمیل شده', cls: 'bg-navy-50 text-navy-400' },
    PENDING: { label: 'در انتظار', cls: 'bg-amber-50 text-amber-600' },
    CONFIRMED: { label: 'تایید شده', cls: 'bg-teal-50 text-teal' },
    CANCELLED: { label: 'لغو شده', cls: 'bg-red-50 text-red-500' },
  };
  const s = map[status] ?? { label: status, cls: 'bg-navy-50 text-navy-400' };
  return <span className={`rounded-full px-3 py-1 text-xs font-medium ${s.cls}`}>{s.label}</span>;
}
