'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { commentSchema, type CommentInput } from '@/lib/validations';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';

// فرم ثبت دیدگاه — با CSRF-safe POST به API سرور
export default function CommentForm({ postId }: { postId: string | null }) {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CommentInput>({
    resolver: zodResolver(commentSchema),
    defaultValues: { postId: postId ?? '' },
  });

  if (!postId) return null;

  const onSubmit = async (data: CommentInput) => {
    setServerError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'comment' }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setServerError('ثبت دیدگاه ناموفق بود؛ دوباره تلاش کنید.');
    }
  };

  if (done) {
    return (
      <p className="flex items-center gap-2 rounded-xl bg-teal-50 text-teal px-5 py-4">
        <CheckCircle2 className="w-5 h-5" />
        دیدگاه شما ثبت شد و پس از تایید مدیر نمایش داده می‌شود.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <input type="hidden" {...register('postId')} />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="c-name" className="label">نام شما</label>
          <input id="c-name" {...register('authorName')} className="input" />
          {errors.authorName && <p className="text-red-500 text-xs mt-1">{errors.authorName.message}</p>}
        </div>
        <div>
          <label htmlFor="c-email" className="label">ایمیل (نمایش داده نمی‌شود)</label>
          <input id="c-email" type="email" dir="ltr" {...register('authorEmail')} className="input" />
          {errors.authorEmail && <p className="text-red-500 text-xs mt-1">{errors.authorEmail.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="c-content" className="label">دیدگاه شما</label>
        <textarea id="c-content" rows={4} {...register('content')} className="input" />
        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
      </div>
      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
      <button type="submit" disabled={isSubmitting} className="btn-primary">
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        ارسال دیدگاه
      </button>
    </form>
  );
}
