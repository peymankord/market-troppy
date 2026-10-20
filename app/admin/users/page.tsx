import { db } from '@/lib/db';
import { faDate } from '@/lib/utils';
import { auth } from '@/auth';
import { UserRoleCell, UserActiveCell } from '@/components/admin/UserCells';

export default async function AdminUsersPage() {
  const session = await auth();
  const canEdit = (session?.user as { role?: string })?.role === 'ADMIN';

  let users: {
    id: string; name: string | null; email: string; role: string;
    isActive: boolean; createdAt: Date;
  }[] = [];
  try {
    users = await db.user.findMany({ orderBy: { createdAt: 'desc' } });
  } catch {}

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy">مدیریت کاربران</h1>
      {!canEdit && (
        <p className="rounded-xl bg-amber-50 text-amber-700 px-4 py-3 text-sm">
          تغییر نقش و غیرفعال‌سازی فقط برای مدیر اصلی (ADMIN) فعال است.
        </p>
      )}

      <div className="card overflow-x-auto">
        <table className="w-full text-sm min-w-[620px]">
          <thead>
            <tr className="bg-navy-50/60 text-navy-400 text-right">
              <th className="p-4 font-medium">کاربر</th>
              <th className="p-4 font-medium">نقش</th>
              <th className="p-4 font-medium">وضعیت</th>
              <th className="p-4 font-medium">عضویت</th>
              <th className="p-4 font-medium">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="p-10 text-center text-navy-300">
                  کاربری یافت نشد. ابتدا seed را اجرا کنید: npx prisma db seed
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-mist">
                <td className="p-4">
                  <p className="font-medium text-navy">{u.name ?? '—'}</p>
                  <p className="text-xs text-navy-300" dir="ltr">{u.email}</p>
                </td>
                <td className="p-4">
                  <UserRoleCell userId={u.id} role={u.role} canEdit={canEdit} />
                </td>
                <td className="p-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${u.isActive ? 'bg-teal-50 text-teal' : 'bg-red-50 text-red-500'}`}>
                    {u.isActive ? 'فعال' : 'غیرفعال'}
                  </span>
                </td>
                <td className="p-4 text-navy-400">{faDate(u.createdAt)}</td>
                <td className="p-4">
                  <UserActiveCell userId={u.id} isActive={u.isActive} canEdit={canEdit} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
