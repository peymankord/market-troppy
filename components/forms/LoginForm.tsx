'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { loginSchema, type LoginInput } from '@/lib/validations';
import { Loader2, LogIn, Eye, EyeOff } from 'lucide-react';

export default function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [serverError, setServerError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    setServerError('');
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.error) {
      setServerError('ایمیل یا رمز عبور اشتباه است.');
      return;
    }
    // انتقال سخت برای رفرش کامل session
    window.location.href = callbackUrl.startsWith('/') ? callbackUrl : '/admin';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="lg-email" className="label">ایمیل</label>
        <input id="lg-email" type="email" dir="ltr" {...register('email')} className="input text-left" autoComplete="email" />
        {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="lg-pass" className="label">رمز عبور</label>
        <div className="relative">
          <input
            id="lg-pass"
            type={showPass ? 'text' : 'password'}
            dir="ltr"
            {...register('password')}
            className="input text-left pl-11"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-300 hover:text-navy"
            aria-label={showPass ? 'پنهان کردن رمز' : 'نمایش رمز'}
          >
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>}
      </div>

      {serverError && (
        <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-2.5" role="alert">
          {serverError}
        </p>
      )}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
        {isSubmitting ? 'در حال ورود…' : 'ورود'}
      </button>
    </form>
  );
}
