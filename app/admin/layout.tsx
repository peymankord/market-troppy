import { auth } from '@/auth';
import AdminShell from '@/components/admin/AdminShell';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'پنل مدیریت',
  description: 'پنل مدیریت محتوای مارکت تروپی',
  path: '/admin',
  noIndex: true,
});

// دسترسی به /admin در middleware محافظت می‌شود؛ اینجا فقط اطلاعات کاربر نمایش داده می‌شود
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const userLabel =
    (session?.user as { name?: string; email?: string } | undefined)?.name ??
    session?.user?.email ??
    'کاربر';

  return <AdminShell userLabel={userLabel}>{children}</AdminShell>;
}
