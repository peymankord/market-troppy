'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterSchema, type NewsletterInput } from '@/lib/validations';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';

// فرم عضویت در خبرنامه — React Hook Form + Zod
export default function NewsletterForm() {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = async (data: NewsletterInput) => {
    setServerError('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setDone(true);
      reset();
    } catch {
      setServerError('خطایی رخ داد؛ لطفاً دوباره تلاش کنید.');
    }
  };

  if (done) {
    return (
      <p className="flex items-center gap-2 text-teal bg-teal/10 rounded-full px-5 py-3 text-sm">
        <CheckCircle2 className="w-4 h-4" />
        عضو خبرنامه شدید. خوش آمدید!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md" noValidate>
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          ایمیل شما
        </label>
        <input
          id="newsletter-email"
          type="email"
          dir="ltr"
          placeholder="you@email.com"
          {...register('email')}
          className="flex-1 rounded-full bg-white/10 border border-white/15 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/40"
        />
        <button type="submit" disabled={isSubmitting} className="btn bg-teal text-white hover:bg-teal-600 px-5 py-3 text-sm">
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
          عضویت
        </button>
      </div>
      {errors.email && <p className="text-red-300 text-xs mt-2 mr-4">{errors.email.message}</p>}
      {serverError && <p className="text-red-300 text-xs mt-2 mr-4">{serverError}</p>}
    </form>
  );
}
