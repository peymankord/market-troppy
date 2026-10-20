import Link from 'next/link';
import { db } from '@/lib/db';
import { faDate, toFaDigits } from '@/lib/utils';
import { deletePost, togglePostStatus } from '@/lib/admin/actions';
import { Plus, Pencil, Trash2, Eye, Search } from 'lucide-react';
import Pagination from '@/components/admin/Pagination';

const PAGE_SIZE = 10;

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: { page?: string; q?: string };
}) {
  const page = Math.max(1, Number(searchParams.page) || 1);
  const q = searchParams.q?.trim();

  let posts: {
    id: string; title: string; slug: string; status: string;
    views: number; publishedAt: Date | null; category: { name: string } | null;
  }[] = [];
  let total = 0;
  try {
    const where = q
      ? { OR: [{ title: { contains: q } }, { slug: { contains: q } }] }
      : {};
    [posts, total] = await Promise.all([
      db.post.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      }),
      db.post.count({ where }),
    ]);
  } catch {
    // بدون دیتابیس
  }

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-navy">مدیریت مقالات</h1>
        <Link href="/admin/posts/new" className="btn-primary text-sm">
          <Plus className="w-4 h-4" />
          مقاله جدید
        </Link>
      </div>

      {/* جستجو */}
      <form className="relative max-w-md">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
        <input
          name="q"
          defaultValue={q}
          placeholder="جستجو بر اساس عنوان یا اسلاگ…"
          className="input !rounded-full pr-11"
        />
      </form>

      {/* جدول */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="bg-navy-50/60 text-navy-400 text-right">
              <th className="p-4 font-medium">عنوان</th>
              <th className="p-4 font-medium">دسته‌بندی</th>
              <th className="p-4 font-medium">وضعیت</th>
              <th className="p-4 font-medium">بازدید</th>
              <th className="p-4 font-medium">تاریخ انتشار</th>
              <th className="p-4 font-medium">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {posts.length === 0 && (
              <tr>
                <td colSpan={6} className="p-10 text-center text-navy-300">
                  مقاله‌ای یافت نشد. اولین مقاله را بسازید!
                </td>
              </tr>
            )}
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-mist transition-colors">
                <td className="p-4">
                  <p className="font-medium text-navy line-clamp-1">{post.title}</p>
                  <p className="text-xs text-navy-300 line-clamp-1">{post.slug}</p>
                </td>
                <td className="p-4 text-navy-400">{post.category?.name ?? '—'}</td>
                <td className="p-4">
                  <form action={togglePostStatus.bind(null, post.id)}>
                    <button
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        post.status === 'PUBLISHED'
                          ? 'bg-teal-50 text-teal hover:bg-teal-100'
                          : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                      }`}
                      title="تغییر وضعیت"
                    >
                      {post.status === 'PUBLISHED' ? 'منتشر شده' : 'پیش‌نویس'}
                    </button>
                  </form>
                </td>
                <td className="p-4 text-navy-400 tabular-nums">{toFaDigits(post.views)}</td>
                <td className="p-4 text-navy-400">
                  {post.publishedAt ? faDate(post.publishedAt) : '—'}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/blog/${encodeURIComponent(post.slug)}`}
                      target="_blank"
                      className="btn-ghost p-2"
                      title="مشاهده"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link href={`/admin/posts/${post.id}`} className="btn-ghost p-2" title="ویرایش">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <form action={deletePost.bind(null, post.id)}>
                      <button
                        className="btn-ghost p-2 !text-red-400 hover:!bg-red-50"
                        title="حذف"
                        formAction={deletePost.bind(null, post.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pages={pages} basePath="/admin/posts" query={q} />
    </div>
  );
}
