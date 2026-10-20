import { z } from 'zod';

// ══════════════════════════════════════════
// اسکیماهای Zod — اعتبارسنجی مشترک فرانت و بک
// ══════════════════════════════════════════

const phoneRegex = /^(\+98|0)?9\d{9}$/;

export const consultationSchema = z.object({
  name: z
    .string()
    .min(2, 'نام باید حداقل ۲ حرف باشد')
    .max(80, 'نام طولانی است'),
  phone: z.string().regex(phoneRegex, 'شماره موبایل معتبر وارد کنید'),
  field: z.string().min(2, 'حوزه فعالیت را وارد کنید').max(120),
  budget: z.string().max(60).optional().or(z.literal('')),
  message: z
    .string()
    .min(10, 'توضیح باید حداقل ۱۰ حرف باشد')
    .max(2000, 'توضیح حداکثر ۲۰۰۰ حرف'),
  // Honeypot ضد ربات — باید خالی بماند
  website: z.string().max(0).optional().or(z.literal('')),
});
export type ConsultationInput = z.infer<typeof consultationSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, 'نام باید حداقل ۲ حرف باشد').max(80),
  email: z.string().email('ایمیل معتبر وارد کنید').max(200),
  phone: z
    .string()
    .regex(phoneRegex, 'شماره موبایل معتبر وارد کنید')
    .optional()
    .or(z.literal('')),
  subject: z.string().min(2, 'موضوع را وارد کنید').max(120),
  message: z.string().min(10, 'پیام حداقل ۱۰ حرف').max(2000),
  website: z.string().max(0).optional().or(z.literal('')),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email('ایمیل معتبر وارد کنید').max(200),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const bookingSchema = z.object({
  name: z.string().min(2, 'نام باید حداقل ۲ حرف باشد').max(80),
  phone: z.string().regex(phoneRegex, 'شماره موبایل معتبر وارد کنید'),
  email: z.string().email().max(200).optional().or(z.literal('')),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'تاریخ معتبر انتخاب کنید'),
  timeSlot: z.string().min(3).max(20),
});
export type BookingInput = z.infer<typeof bookingSchema>;

export const commentSchema = z.object({
  content: z.string().min(3, 'دیدگاه حداقل ۳ حرف').max(1000),
  authorName: z.string().min(2, 'نام باید حداقل ۲ حرف باشد').max(80),
  authorEmail: z.string().email('ایمیل معتبر وارد کنید').max(200),
  postId: z.string().min(1),
});
export type CommentInput = z.infer<typeof commentSchema>;

export const loginSchema = z.object({
  email: z.string().email('ایمیل معتبر وارد کنید'),
  password: z.string().min(6, 'رمز عبور حداقل ۶ حرف'),
});
export type LoginInput = z.infer<typeof loginSchema>;

// اسکیمای مقاله برای پنل ادمین
export const postSchema = z.object({
  title: z.string().min(3, 'عنوان حداقل ۳ حرف').max(200),
  slug: z
    .string()
    .min(3)
    .max(220)
    .regex(/^[\u0600-\u06FFa-zA-Z0-9\-‌]+$/, 'اسلاگ فقط حروف، عدد و خط تیره'),
  excerpt: z.string().min(10, 'خلاصه حداقل ۱۰ حرف').max(500),
  content: z.string().min(20, 'محتوا کوتاه است'),
  coverImage: z.string().max(500).optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED']),
  seoTitle: z.string().max(60, 'حداکثر ۶۰ کاراکتر').optional().or(z.literal('')),
  seoDescription: z
    .string()
    .max(155, 'حداکثر ۱۵۵ کاراکتر')
    .optional()
    .or(z.literal('')),
  focusKeyword: z.string().max(80).optional().or(z.literal('')),
  categoryId: z.string().optional().or(z.literal('')),
});
export type PostInput = z.infer<typeof postSchema>;
