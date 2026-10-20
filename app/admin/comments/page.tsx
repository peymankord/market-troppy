import Link from 'next/link';
import { db } from '@/lib/db';
import { faDate } from '@/lib/utils';
import { approveComment, deleteComment } from '@/lib/admin/actions';
import { CheckCircle2, Trash2, MessageSquare } from 'lucide-react';

export default async function AdminCommentsPage() {
  let comments: {
    id: string; authorName: string; content: string; approved: boolean; createdAt: Date;
    post: { title: string; slug: string };
  }[] = [];
  try {
    comments = await db.comment.findMany({
      include: { post: { select: { title: true, slug: true } } },
      orderBy: [{ approved: 'asc' }, { createdAt: 'desc' }],
      take: 50,
    });
  } catch {}

  const pending = comments.filter((c) => !c.approved).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-navy">مدیریت دیدگاه‌ها</h1>
        {pending > 0 && (
          <span className="rounded-full bg-amber-50 text-amber-600 px-4 py-1.5 text-sm font-medium">
            {pending} دیدگاه در انتظار تایید
          </span>
        )}
      </div>

      {comments.length === 0 ? (
        <div className="card p-14 text-center">
          <MessageSquare className="w-10 h-10 text-navy-200 mx-auto mb-3" />
          <p className="text-navy-300">دیدگاهی ثبت نشده است.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className={`card p-5 ${!c.approved && 'border-amber-200 bg-amber-50/40'}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-[240px]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-9 h-9 rounded-full bg-teal-50 text-teal flex items-center justify-center font-bold text-sm">
                      {c.authorName.slice(0, 1)}
                    </span>
                    <div>
                      <p className="font-medium text-navy text-sm">{c.authorName}</p>
                      <p className="text-xs text-navy-300">
                        {faDate(c.createdAt)} — مقاله:{' '}
                        <Link
                          href={`/blog/${encodeURIComponent(c.post.slug)}`}
                          target="_blank"
                          className="link-accent"
                        >
                          {c.post.title}
                        </Link>
                      </p>
                    </div>
                  </div>
                  <p className="text-navy-500 text-sm leading-7">{c.content}</p>
                </div>

                <div className="flex items-center gap-2">
                  {!c.approved && (
                    <form action={approveComment.bind(null, c.id)}>
                      <button className="btn bg-teal-50 text-teal hover:bg-teal hover:text-white px-4 py-2 text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                        تایید
                      </button>
                    </form>
                  )}
                  {c.approved && (
                    <span className="rounded-full bg-teal-50 text-teal px-3 py-1 text-xs font-medium">
                      تایید شده
                    </span>
                  )}
                  <form action={deleteComment.bind(null, c.id)}>
                    <button className="btn bg-red-50 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 text-xs">
                      <Trash2 className="w-4 h-4" />
                      حذف
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
