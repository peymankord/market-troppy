'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { consultationSchema, type ConsultationInput } from '@/lib/validations';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';

const BUDGETS = ['کمتر از ۵۰ میلیون', '۵۰ تا ۱۵۰ میلیون', '۱۵۰ تا ۵۰۰ میلیون', 'بیش از ۵۰۰ میلیون'];

// فرم مشاوره اصلی — ذخیره در DB + ایمیل اطلاع‌رسانی
export default function ConsultationMiniForm() {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationInput>({ resolver: zodResolver(consultationSchema) });

  const onSubmit = async (data: ConsultationInput) => {
    setServerError('');
    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? 'خطا');
      }
      setDone(true);
      reset();
    } catch (e) {
      setServerError(e instanceof Error && e.message !== 'خطا' ? e.message : 'ثبت درخواست ناموفق بود؛ دوباره تلاش کنید.');
    }
  };

  if (done) {
    return (
      <div className="text-center py-12">
        <span className="w-16 h-16 mx-auto rounded-full bg-teal-50 text-teal flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </span>
        <h3 className="text-xl font-bold text-navy mb-2">درخواست شما ثبت شد!</h3>
        <p className="text-navy-400 leading-7">
          کارشناسان ما حداکثر تا یک روز کاری برای هماهنگی جلسه با شما تماس می‌گیرند.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot ضد ربات — نامرئی برای کاربر */}
      <input type="text" {...register('website')} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="ct-name" className="label">نام و نام خانوادگی *</label>
          <input id="ct-name" {...register('name')} className="input" placeholder="مثلاً: علی رضایی" />
          {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="ct-phone" className="label">شماره موبایل *</label>
          <input id="ct-phone" dir="ltr" inputMode="tel" {...register('phone')} className="input text-left" placeholder="09123456789" />
          {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="ct-field" className="label">حوزه فعالیت *</label>
          <input id="ct-field" {...register('field')} className="input" placeholder="مثلاً: فروشگاه اینترنتی پوشاک" />
          {errors.field && <p className="text-red-500 text-xs mt-1.5">{errors.field.message}</p>}
        </div>
        <div>
          <label htmlFor="ct-budget" className="label">بودجه تقریبی بازاریابی (ماهانه)</label>
          <select id="ct-budget" {...register('budget')} className="input">
            <option value="">انتخاب کنید…</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b} تومان</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="ct-message" className="label">درباره چالش اصلی کسب‌وکارتان بنویسید *</label>
        <textarea id="ct-message" rows={4} {...register('message')} className="input" placeholder="مثلاً: فروش ما از تبلیغات خوب است اما مشتری برگشتی نداریم…" />
        {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message.message}</p>}
      </div>

      {serverError && <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-2.5">{serverError}</p>}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto">
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {isSubmitting ? 'در حال ارسال…' : 'ثبت درخواست مشاوره رایگان'}
      </button>
    </form>
  );
}
