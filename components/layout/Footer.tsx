import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Linkedin, Send, ArrowLeft } from 'lucide-react';
import { NAV_ITEMS, SERVICES } from '@/lib/constants';
import Logo from './Logo';
import NewsletterForm from '@/components/forms/NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-auto">
      {/* خبرنامه */}
      <div className="container pt-14 pb-10 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              نکته‌های رشد فروش، مستقیم در ایمیل شما
            </h2>
            <p className="text-white/60 text-sm">
              هر هفته یک استراتژی کاربردی — بدون اسپم، با امکان لغو هر زمان.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* لینک‌ها */}
      <div className="container py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="text-white/60 text-sm leading-7 mt-4 max-w-xs">
            شرکت تخصصی مشاوره بازاریابی و مدیریت بازاریابی — از استراتژی تا اتوماسیون هوشمند فروش
            همراه شما هستیم.
          </p>
        </div>

        <nav aria-label="لینک‌های سریع">
          <h3 className="font-bold mb-4 text-white/90">دسترسی سریع</h3>
          <ul className="space-y-2.5 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/60 hover:text-teal transition-colors inline-flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3 h-3" />
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/consultation"
                className="text-white/60 hover:text-teal transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3 h-3" />
                رزرو مشاوره
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="خدمات">
          <h3 className="font-bold mb-4 text-white/90">خدمات</h3>
          <ul className="space-y-2.5 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${encodeURIComponent(s.slug)}`}
                  className="text-white/60 hover:text-teal transition-colors"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-bold mb-4 text-white/90">تماس با ما</h3>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 mt-0.5 text-teal shrink-0" />
              تهران، خیابان ولیعصر، بالاتر از پارک ساعی، برج نگین، طبقه ۱۲
            </li>
            <li className="flex items-center gap-2.5" dir="ltr">
              <Phone className="w-4 h-4 text-teal shrink-0" />
              <span dir="ltr">۰۲۱-۲۸۴۲۱۲۳۴</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-teal shrink-0" />
              <span dir="ltr">info@markettroppy.ir</span>
            </li>
          </ul>
          <div className="flex items-center gap-3 mt-5">
            {[
              { icon: Instagram, label: 'اینستاگرام', href: 'https://instagram.com/markettroppy' },
              { icon: Linkedin, label: 'لینکدین', href: 'https://linkedin.com/company/markettroppy' },
              { icon: Send, label: 'تلگرام', href: 'https://t.me/markettroppy' },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-teal hover:border-teal transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>© {new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(new Date())} مارکت تروپی — کلیه حقوق محفوظ است.</p>
          <p>طراحی و توسعه با ❤ برای رشد کسب‌وکارها</p>
        </div>
      </div>
    </footer>
  );
}
