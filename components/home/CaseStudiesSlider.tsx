'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';
import { ArrowLeft, Quote } from 'lucide-react';
import Link from 'next/link';
import SectionHeading from '@/components/shared/SectionHeading';

const CASES = [
  {
    title: 'رشد ۶۵٪ فروش فروشگاه آرمیس',
    industry: 'تجارت الکترونیک',
    result: '+۶۵٪',
    bg: 'from-navy to-navy-700',
  },
  {
    title: 'دو برابر شدن لید ماهانه صنایع بهاران',
    industry: 'مواد غذایی',
    result: '۲٪×',
    bg: 'from-teal-700 to-teal',
  },
  {
    title: 'خودکارسازی پاسخ‌گویی استارتاپ لیانو',
    industry: 'نرم‌افزار',
    result: '۳۰ ثانیه',
    bg: 'from-navy-600 to-teal-700',
  },
  {
    title: 'ری‌برندینگ موفق هلدینگ پارس',
    industry: 'هلدینگ سرمایه‌گذاری',
    result: '+۱۲۰٪',
    bg: 'from-navy-800 to-navy-500',
  },
];

// اسلایدر پارالکس نمونه‌کارها — اسکرول افقی Pin شده با GSAP
export default function CaseStudiesSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current;
        if (!track) return;
        const distance = track.scrollWidth - window.innerWidth + 80;

        // در RTL حرکت به سمت راست (x مثبت)
        gsap.to(track, {
          x: distance,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80px',
            end: () => `+=${distance}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-mist overflow-hidden" aria-labelledby="cases-heading">
      <div className="container section-pad">
        <div id="cases-heading">
          <SectionHeading
            overline="نمونه‌کارها"
            title="نتایجی که خودشان حرف می‌زنند"
            description="هر پروژه یک داستان رشد است؛ اسکرول کنید تا با چند مورد از آن‌ها آشنا شوید."
          />
        </div>
      </div>

      <div ref={trackRef} className="flex gap-6 px-8 lg:px-24 pb-20 w-fit">
        {CASES.map((c) => (
          <article
            key={c.title}
            className="relative w-[85vw] sm:w-[420px] h-[380px] shrink-0 rounded-3xl overflow-hidden group"
          >
            {/* لایه گرادینت پارالکس */}
            <div className={`case-bg absolute inset-0 bg-gradient-to-br ${c.bg}`} aria-hidden />
            <div className="absolute inset-0 bg-dots opacity-30" aria-hidden />

            <div className="relative h-full flex flex-col justify-between p-7">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 backdrop-blur border border-white/15 px-3 py-1 text-xs text-white/80">
                  {c.industry}
                </span>
                <Quote className="w-7 h-7 text-white/25" aria-hidden />
              </div>
              <div>
                <p className="text-5xl font-bold text-teal-300 mb-3">{c.result}</p>
                <h3 className="text-xl font-bold text-white leading-8">{c.title}</h3>
                <Link
                  href="/case-studies"
                  className="mt-5 inline-flex items-center gap-2 text-sm text-white/70 hover:text-teal-300 transition-colors"
                >
                  مشاهده جزئیات کیس
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </article>
        ))}

        {/* کارت پایانی CTA */}
        <div className="w-[85vw] sm:w-[420px] h-[380px] shrink-0 rounded-3xl bg-white border-2 border-dashed border-teal/40 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="h-title text-navy">داستان بعدی، از شماست</p>
          <p className="text-navy-400 text-sm leading-7">
            آماده‌اید نتیجه‌ای مشابه برای کسب‌وکارتان بسازیم؟
          </p>
          <Link href="/consultation" className="btn-secondary mt-2">
            شروع همکاری
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
