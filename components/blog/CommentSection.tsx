import { db } from '@/lib/db';
import { faDate } from '@/lib/utils';
import CommentForm from './CommentForm';
import { MessageSquare } from 'lucide-react';

// لیست دیدگاه‌های تاییدشده + فرم ثبت دیدگاه
export default async function CommentSection({ postId }: { postId: string | null }) {
  let comments: { id: string; authorName: string; content: string; createdAt: Date }[] = [];
  if (postId) {
    try {
      comments = await db.comment.findMany({
        where: { postId, approved: true },
        orderBy: { createdAt: 'desc' },
        select: { id: true, authorName: true, content: true, createdAt: true },
        take: 20,
      });
    } catch {
      comments = [];
    }
  }

  return (
    <section aria-labelledby="comments-heading" className="card p-6 md:p-8">
      <h2 id="comments-heading" className="flex items-center gap-2 text-xl font-bold text-navy mb-6">
        <MessageSquare className="w-5 h-5 text-teal" />
        دیدگاه‌ها
        {comments.length > 0 && (
          <span className="text-sm font-normal text-navy-300">
            ({new Intl.NumberFormat('fa-IR').format(comments.length)})
          </span>
        )}
      </h2>

      {comments.length === 0 ? (
        <p className="text-navy-300 text-sm mb-8">
          هنوز دیدگاهی ثبت نشده؛ اولین نفر باشید! دیدگاه شما پس از تایید نمایش داده می‌شود.
        </p>
      ) : (
        <ul className="space-y-5 mb-10">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-4">
              <span className="w-10 h-10 rounded-full bg-teal-50 text-teal flex items-center justify-center font-bold shrink-0">
                {c.authorName.slice(0, 1)}
              </span>
              <div className="flex-1 rounded-2xl bg-mist p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="font-medium text-navy text-sm">{c.authorName}</p>
                  <time className="text-xs text-navy-300" dateTime={c.createdAt.toISOString()}>
                    {faDate(c.createdAt)}
                  </time>
                </div>
                <p className="text-navy-500 text-sm leading-7">{c.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <CommentForm postId={postId} />
    </section>
  );
}
