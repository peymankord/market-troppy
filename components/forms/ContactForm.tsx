'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactInput } from '@/lib/validations';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';

// فرم تماس عمومی
export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setServerError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'contact' }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
      reset();
    } catch {
      setServerError('ارسال ناموفق بود؛ دوباره تلاش کنید.');
    }
  };

  if (done) {
    return (
      <p className="flex items-center gap-2 rounded-xl bg-teal-50 text-teal px-4 py-3 text-sm">
        <CheckCircle2 className="w-4 h-4 shrink-0" />
        پیام شما ارسال شد. به‌زودی پاسخ می‌دهیم.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <input type="text" {...register('website')} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div>
        <label htmlFor="cf-name" className="label">نام *</label>
        <input id="cf-name" {...register('name')} className="input" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="cf-email" className="label">ایمیل *</label>
        <input id="cf-email" type="email" dir="ltr" {...register('email')} className="input text-left" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      {!compact && (
        <div>
          <label htmlFor="cf-phone" className="label">موبایل (اختیاری)</label>
          <input id="cf-phone" dir="ltr" {...register('phone')} className="input text-left" />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      )}
      <div>
        <label htmlFor="cf-subject" className="label">موضوع *</label>
        <input id="cf-subject" {...register('subject')} className="input" />
        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
      </div>
      <div>
        <label htmlFor="cf-message" className="label">پیام *</label>
        <textarea id="cf-message" rows={compact ? 3 : 4} {...register('message')} className="input" />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>
      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        ارسال پیام
      </button>
    </form>
  );
}
