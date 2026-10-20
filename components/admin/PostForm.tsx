'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { upsertPost } from '@/lib/admin/actions';
import { faSlugify } from '@/lib/utils';
import { Loader2, Save, CheckCircle2, AlertCircle } from 'lucide-react';

type PostDefaults = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string | null;
  status?: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  focusKeyword?: string | null;
  categoryId?: string | null;
};

// فرم ایجاد/ویرایش مقاله — با بخش تنظیمات سئو و چک‌لیست
export default function PostForm({
  defaults = {},
  categories,
}: {
  defaults?: PostDefaults;
  categories: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [title, setTitle] = useState(defaults.title ?? '');
  const [slug, setSlug] = useState(defaults.slug ?? '');
  const [slugEdited, setSlugEdited] = useState(!!defaults.slug);

  // پیشنهاد خودکار اسلاگ از روی عنوان (فارسی)
  const onTitleChange = (v: string) => {
    setTitle(v);
    if (!slugEdited) setSlug(faSlugify(v));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    startTransition(async () => {
      const fd = new FormData(form);
      if (defaults.id) fd.set('id', defaults.id);
      const res = await upsertPost(fd);
      if (res.ok) {
        setResult({ ok: true, message: 'مقاله با موفقیت ذخیره شد.' });
        router.push('/admin/posts');
        router.refresh();
      } else {
        setFieldErrors((res as { errors?: Record<string, string[]> }).errors ?? {});
        setResult({ ok: false, message: 'برخی فیلدها نیاز به اصلاح دارند.' });
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="grid lg:grid-cols-3 gap-6" noValidate>
      {/* ستون اصلی */}
      <div className="lg:col-span-2 space-y-6">
        <div className="card p-6 space-y-5">
          <div>
            <label htmlFor="p-title" className="label">عنوان مقاله *</label>
            <input
              id="p-title"
              name="title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="input"
            />
            {fieldErrors.title && <p className="text-red-500 text-xs mt-1">{fieldErrors.title[0]}</p>}
          </div>
          <div>
            <label htmlFor="p-slug" className="label">اسلاگ (آدرس URL) *</label>
            <input
              id="p-slug"
              name="slug"
              value={slug}
              onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }}
              className="input"
              dir="rtl"
            />
            <p className="text-xs text-navy-300 mt-1">
              در آدرس: /blog/{slug && <span className="text-teal">{encodeURIComponent(slug)}</span>}
            </p>
            {fieldErrors.slug && <p className="text-red-500 text-xs mt-1">{fieldErrors.slug[0]}</p>}
          </div>
          <div>
            <label htmlFor="p-excerpt" className="label">خلاصه مقاله *</label>
            <textarea id="p-excerpt" name="excerpt" rows={3} defaultValue={defaults.excerpt} className="input" />
            {fieldErrors.excerpt && <p className="text-red-500 text-xs mt-1">{fieldErrors.excerpt[0]}</p>}
          </div>
          <div>
            <label htmlFor="p-content" className="label">محتوای مقاله (HTML ادیتور) *</label>
            <textarea
              id="p-content"
              name="content"
              rows={14}
              defaultValue={defaults.content}
              className="input font-mono !text-sm"
              placeholder={'<h2>عنوان بخش</h2>\n<p>متن پاراگراف…</p>'}
              dir="rtl"
            />
            <p className="text-xs text-navy-300 mt-1">
              تگ‌های مجاز: h2, h3, p, ul, ol, blockquote, table, code, a — اسکریپت‌ها هنگام ذخیره حذف می‌شوند.
            </p>
            {fieldErrors.content && <p className="text-red-500 text-xs mt-1">{fieldErrors.content[0]}</p>}
          </div>
        </div>

        {/* تنظیمات سئو */}
        <div className="card p-6 space-y-5">
          <h2 className="font-bold text-navy flex items-center gap-2">
            <span className="w-2 h-5 bg-teal rounded-full" />
            تنظیمات سئو
          </h2>
          <div>
            <label htmlFor="p-seotitle" className="label">عنوان سئو (حداکثر ۶۰ کاراکتر)</label>
            <input id="p-seotitle" name="seoTitle" maxLength={60} defaultValue={defaults.seoTitle ?? ''} className="input" />
          </div>
          <div>
            <label htmlFor="p-seodesc" className="label">توضیحات متا (حداکثر ۱۵۵ کاراکتر)</label>
            <textarea id="p-seodesc" name="seoDescription" rows={2} maxLength={155} defaultValue={defaults.seoDescription ?? ''} className="input" />
          </div>
          <div>
            <label htmlFor="p-keyword" className="label">کلمه کلیدی اصلی</label>
            <input id="p-keyword" name="focusKeyword" defaultValue={defaults.focusKeyword ?? ''} className="input" />
          </div>
          {/* چک‌لیست سئو */}
          <ul className="rounded-xl bg-mist p-4 space-y-2 text-sm">
            <li className="flex items-center gap-2 text-navy-500">
              <CheckCircle2 className="w-4 h-4 text-teal" /> اسکیمای Article به‌صورت خودکار تولید می‌شود
            </li>
            <li className="flex items-center gap-2 text-navy-500">
              <CheckCircle2 className="w-4 h-4 text-teal" /> بردکرامب و لینک‌سازی داخلی خودکار فعال است
            </li>
            <li className="flex items-center gap-2 text-navy-500">
              <AlertCircle className="w-4 h-4 text-amber-500" /> از H1 در محتوا استفاده نکنید (فقط عنوان مقاله)
            </li>
          </ul>
        </div>
      </div>

      {/* ستون جانبی */}
      <div className="space-y-6">
        <div className="card p-6 space-y-5">
          <div>
            <label htmlFor="p-status" className="label">وضعیت</label>
            <select id="p-status" name="status" defaultValue={defaults.status ?? 'DRAFT'} className="input">
              <option value="DRAFT">پیش‌نویس</option>
              <option value="PUBLISHED">منتشر شده</option>
            </select>
          </div>
          <div>
            <label htmlFor="p-cat" className="label">دسته‌بندی</label>
            <select id="p-cat" name="categoryId" defaultValue={defaults.categoryId ?? ''} className="input">
              <option value="">بدون دسته‌بندی</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="p-cover" className="label">آدرس تصویر شاخص</label>
            <input
              id="p-cover"
              name="coverImage"
              defaultValue={defaults.coverImage ?? ''}
              className="input text-left"
              dir="ltr"
              placeholder="/images/post-cover.jpg"
            />
          </div>
        </div>

        {result && (
          <p className={`rounded-xl px-4 py-3 text-sm ${result.ok ? 'bg-teal-50 text-teal' : 'bg-red-50 text-red-500'}`}>
            {result.message}
          </p>
        )}

        <button type="submit" disabled={pending} className="btn-primary w-full">
          {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {pending ? 'در حال ذخیره…' : 'ذخیره مقاله'}
        </button>
      </div>
    </form>
  );
}
