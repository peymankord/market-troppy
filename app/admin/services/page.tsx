import { db } from '@/lib/db';
import { SERVICES } from '@/lib/constants';
import ServiceIcon from '@/components/shared/ServiceIcon';
import { Sparkles } from 'lucide-react';

// مدیریت خدمات — نمای ۶ خدمت موجود + مقداردهی اولیه دیتابیس
export default async function AdminServicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">مدیریت خدمات</h1>
        <p className="text-navy-300 text-sm mt-1">
          ۶ خدمت اصلی سایت — محتوای آن‌ها در فایل <code className="bg-navy-50 px-1.5 py-0.5 rounded text-teal">lib/constants.ts</code> و
          جدول <code className="bg-navy-50 px-1.5 py-0.5 rounded text-teal">services</code> نگهداری می‌شود.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {SERVICES.map((s) => (
          <article key={s.slug} className="card p-5 flex gap-4">
            <span className="w-12 h-12 rounded-xl bg-teal-50 text-teal flex items-center justify-center shrink-0">
              <ServiceIcon name={s.icon} className="w-6 h-6" />
            </span>
            <div className="min-w-0">
              <h2 className="font-bold text-navy text-sm mb-1">{s.title}</h2>
              <p className="text-xs text-navy-400 leading-6 line-clamp-2">{s.summary}</p>
              <p className="text-[11px] text-navy-300 mt-2" dir="ltr">/services/{encodeURIComponent(s.slug)}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="card p-6 flex items-start gap-4 bg-teal-50/50 !border-teal-200">
        <Sparkles className="w-5 h-5 text-teal shrink-0 mt-0.5" />
        <p className="text-sm text-navy-500 leading-7">
          برای ویرایش متن خدمات، فایل <code className="bg-white px-1.5 py-0.5 rounded text-teal">lib/constants.ts</code> را
          ویرایش کنید. با اجرای <code dir="ltr" className="bg-white px-1.5 py-0.5 rounded text-teal">npm run db:seed</code> خدمات
          در دیتابیس هم به‌روزرسانی می‌شوند. صفحه ویژه «اتوماسیون هوش مصنوعی» در مسیر
          <code dir="ltr" className="bg-white px-1.5 py-0.5 rounded text-teal">app/services/ai-automation/page.tsx</code> قرار دارد.
        </p>
      </div>
    </div>
  );
}
