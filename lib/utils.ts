import { clsx, type ClassValue } from './clsx';

export { clsx as cn };

/** تبدیل ارقام لاتین به فارسی */
export function toFaDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
}

/** ساخت اسلاگ فارسی تمیز برای URL */
export function faSlugify(text: string): string {
  return text
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[؟?،,;:!'"«»()[\]{}]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** فرمت تاریخ شمسی */
export function faDate(date: Date | string, opts?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...opts,
  }).format(new Date(date));
}

/** محاسبه زمان مطالعه بر اساس تعداد کلمات (خواندن فارسی ~۲۰۰ کلمه در دقیقه) */
export function readingTime(html: string): number {
  const words = html.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** حذف تگ‌های خطرناک HTML از ورودی کاربر (لایه اول دفاع XSS) */
export function stripDangerousHtml(input: string): string {
  return input
    .replace(/<script[\s\S]*?\/script>/gi, '')
    .replace(/<style[\s\S]*?\/style>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '');
}

/** پاک‌سازی رشته متنی ساده کاربر (برای فرم‌ها) */
export function sanitizePlainText(input: string, maxLen = 2000): string {
  return stripDangerousHtml(input)
    .replace(/[<>"'`]/g, '')
    .trim()
    .slice(0, maxLen);
}

/** خلاصه متن برای کارت‌ها */
export function truncate(text: string, len = 150): string {
  return text.length > len ? text.slice(0, len).trimEnd() + '…' : text;
}
