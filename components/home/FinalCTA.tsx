import Link from 'next/link';
import { CalendarClock, PhoneCall } from 'lucide-react';
import { FadeIn } from '@/components/shared/MotionFadeIn';

// سکشن CTA نهایی — گرادینت متحرک + دکمه رزرو
export default function FinalCTA() {
  return (
    <section className="section-pad">
      <div className="container">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-cta-gradient p-10 md:p-16 lg:p-20 text-center shadow-soft-lg">
            <div className="absolute inset-0 bg-dots opacity-40" aria-hidden />
            <div className="relative">
              <h2 className="h-display text-white mb-5">
                آماده‌اید فروش‌تان را
                <span className="block mt-1">هوشمند کنید؟</span>
              </h2>
              <p className="text-white/80 text-lead max-w-xl mx-auto mb-10">
                اولین جلسه مشاوره کاملاً رایگان است. در ۳۰ دقیقه، تصویر روشنی از مسیر رشد
                کسب‌وکارتان به شما می‌دهیم.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/consultation"
                  className="btn bg-white text-navy hover:bg-navy hover:text-white px-8 py-4 text-base font-bold shadow-lg"
                >
                  <CalendarClock className="w-5 h-5" />
                  رزرو مشاوره رایگان
                </Link>
                <a
                  href="tel:02128421234"
                  className="btn text-white border-2 border-white/40 hover:border-white px-8 py-4 text-base"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span dir="ltr">۰۲۱-۲۸۴۲۱۲۳۴</span>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
