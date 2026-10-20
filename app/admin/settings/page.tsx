import { db } from '@/lib/db';
import { saveSetting } from '@/lib/admin/actions';
import { Save, Megaphone, Share2 } from 'lucide-react';
import NewsletterExportButton from '@/components/admin/NewsletterExport';

export default async function AdminSettingsPage() {
  let contact: Record<string, string> = { phone: '', email: '', address: '' };
  let social: Record<string, string> = { instagram: '', linkedin: '', telegram: '', whatsapp: '' };
  try {
    const rows = await db.siteSetting.findMany({ where: { key: { in: ['contact', 'social'] } } });
    for (const row of rows) {
      if (row.key === 'contact') contact = { ...contact, ...(row.value as Record<string, string>) };
      if (row.key === 'social') social = { ...social, ...(row.value as Record<string, string>) };
    }
  } catch {}

  const contactAction = async (fd: FormData) => {
    'use server';
    await saveSetting('contact', {
      phone: String(fd.get('phone') ?? ''),
      email: String(fd.get('email') ?? ''),
      address: String(fd.get('address') ?? ''),
    });
  };
  const socialAction = async (fd: FormData) => {
    'use server';
    await saveSetting('social', {
      instagram: String(fd.get('instagram') ?? ''),
      linkedin: String(fd.get('linkedin') ?? ''),
      telegram: String(fd.get('telegram') ?? ''),
      whatsapp: String(fd.get('whatsapp') ?? ''),
    });
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-navy">تنظیمات سایت</h1>

      {/* اطلاعات تماس */}
      <form action={contactAction} className="card p-6 space-y-5">
        <h2 className="font-bold text-navy flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-teal" />
          اطلاعات تماس
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="s-phone" className="label">تلفن</label>
            <input id="s-phone" name="phone" defaultValue={contact.phone} className="input" />
          </div>
          <div>
            <label htmlFor="s-email" className="label">ایمیل</label>
            <input id="s-email" name="email" dir="ltr" defaultValue={contact.email} className="input text-left" />
          </div>
        </div>
        <div>
          <label htmlFor="s-address" className="label">آدرس دفتر</label>
          <input id="s-address" name="address" defaultValue={contact.address} className="input" />
        </div>
        <button className="btn-primary text-sm">
          <Save className="w-4 h-4" />
          ذخیره اطلاعات تماس
        </button>
      </form>

      {/* شبکه‌های اجتماعی */}
      <form action={socialAction} className="card p-6 space-y-5">
        <h2 className="font-bold text-navy flex items-center gap-2">
          <Share2 className="w-5 h-5 text-teal" />
          شبکه‌های اجتماعی
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {(['instagram', 'linkedin', 'telegram', 'whatsapp'] as const).map((key) => (
            <div key={key}>
              <label htmlFor={`s-${key}`} className="label capitalize">{key}</label>
              <input
                id={`s-${key}`}
                name={key}
                dir="ltr"
                defaultValue={social[key]}
                className="input text-left"
                placeholder="https://…"
              />
            </div>
          ))}
        </div>
        <button className="btn-primary text-sm">
          <Save className="w-4 h-4" />
          ذخیره شبکه‌ها
        </button>
      </form>

      {/* خبرنامه */}
      <div className="card p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-navy mb-1">خبرنامه</h2>
          <p className="text-sm text-navy-300">لیست کامل اعضای خبرنامه را دانلود کنید.</p>
        </div>
        <NewsletterExportButton />
      </div>
    </div>
  );
}
