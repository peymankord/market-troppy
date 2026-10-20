'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';
import { ArrowLeft, Bot, Factory, Workflow } from 'lucide-react';
import { FadeIn } from '@/components/shared/MotionFadeIn';

/**
 * سکشن اتوماسیون هوش مصنوعی — انیمیشن SVG اسکرول‌محور:
 * با اسکرول، کارخانه فیزیکی محو و فلوچارت دیجیتال جایگزین می‌شود
 */
export default function AiAutomationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 90%',
          scrub: 0.6,
        },
      });

      // ۱) محو شدن کارخانه فیزیکی
      tl.to('.ai-factory', { opacity: 0.25, scale: 0.9, x: -20, ease: 'none', duration: 1 }, 0);
      // ۲) کشیده شدن خطوط اتصال (draw)
      tl.to(
        '.ai-connector',
        { strokeDashoffset: 0, ease: 'none', duration: 1, stagger: 0.05 },
        0.2
      );
      // ۳) ظاهر شدن گره‌های دیجیتال (پاپ)
      tl.fromTo(
        '.ai-node',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'back.out(2)', duration: 0.4, stagger: 0.08, transformOrigin: 'center' },
        0.5
      );
      // ۴) درخشش مغز AI مرکزی
      tl.to('.ai-brain', { scale: 1.15, opacity: 1, transformOrigin: 'center', duration: 0.4 }, 1);

      // پالس دائمی مغز AI (مستقل از اسکرول)
      gsap.to('.ai-brain-pulse', {
        scale: 1.35,
        opacity: 0,
        transformOrigin: 'center',
        duration: 2,
        repeat: -1,
        ease: 'power1.out',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="section-pad bg-white relative overflow-hidden" aria-labelledby="ai-heading">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* متن */}
          <FadeIn>
            <p className="inline-flex items-center gap-2 text-teal font-medium text-sm mb-4">
              <span className="w-6 h-0.5 bg-teal rounded-full" aria-hidden />
              خدمت ویژه ما
            </p>
            <h2 id="ai-heading" className="h-title text-navy mb-5">
              کارخانه‌ی فیزیکی‌تان را به
              <span className="text-gradient"> دیتاسنتر فروش </span>
              تبدیل کنید
            </h2>
            <p className="text-lead mb-8">
              فرآیندهای دستی و تکراری فروش و بازاریابی، انرژی تیم شما را می‌بلعد. ما با ایجنت‌های
              هوش مصنوعی، کل مسیر از جذب لید تا پیگیری و گزارش را خودکار می‌کنیم.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                'پاسخ به مشتریان در کمتر از ۱ دقیقه، ۲۴ ساعته',
                'امتیازدهی خودکار لیدها با هوش مصنوعی',
                'پیگیری هوشمند سرنخ‌ها تا لحظه بستن معامله',
                'گزارش مدیریتی خودکار، هر صبح در پیام‌رسان شما',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-navy-500">
                  <span className="w-6 h-6 rounded-full bg-teal-50 text-teal flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/services/ai-automation" className="btn-primary">
              <Workflow className="w-4 h-4" />
              صفحه اختصاصی اتوماسیون AI
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </FadeIn>

          {/* SVG انیمیشنی */}
          <FadeIn delay={0.15}>
            <div ref={svgWrapRef} className="relative" aria-hidden>
              <svg viewBox="0 0 520 380" className="w-full h-auto drop-shadow-xl" role="img">
                {/* کارخانه فیزیکی */}
                <g className="ai-factory" opacity="1">
                  <rect x="30" y="200" width="140" height="110" rx="10" fill="#1C3157" />
                  <rect x="50" y="160" width="20" height="50" rx="4" fill="#2A4370" />
                  <rect x="85" y="140" width="20" height="70" rx="4" fill="#2A4370" />
                  <path d="M30 200 L60 170 L90 200 L120 170 L150 200 L170 180" fill="none" stroke="#3E5B8C" strokeWidth="6" strokeLinejoin="round" />
                  {[55, 90, 125].map((x) => (
                    <rect key={x} x={x} y="230" width="22" height="22" rx="4" fill="#14B8A6" opacity="0.85" />
                  ))}
                  <rect x="72" y="275" width="56" height="35" rx="6" fill="#0F172A" />
                </g>

                {/* خطوط اتصال — ابتدا پنهان (dashoffset) */}
                {[
                  'M170 255 C 240 255, 250 190, 300 190',
                  'M170 255 C 240 255, 250 260, 300 260',
                  'M170 255 C 240 255, 250 320, 300 320',
                ].map((d, i) => (
                  <path
                    key={i}
                    className="ai-connector"
                    d={d}
                    fill="none"
                    stroke="#14B8A6"
                    strokeWidth="3"
                    strokeDasharray="300"
                    strokeDashoffset="300"
                    strokeLinecap="round"
                  />
                ))}

                {/* مغز AI مرکزی */}
                <circle className="ai-brain-pulse" cx="340" cy="255" r="46" fill="none" stroke="#14B8A6" strokeWidth="2" opacity="0.6" />
                <circle className="ai-brain" cx="340" cy="255" r="42" fill="#14B8A6" opacity="0.9" />
                <text x="340" y="264" textAnchor="middle" fontSize="24" fontWeight="700" fill="#0F172A">AI</text>

                {/* فلوچارت دیجیتال — گره‌ها */}
                {[
                  { x: 445, y: 130, label: 'لید' },
                  { x: 470, y: 255, label: 'چت' },
                  { x: 445, y: 370, label: 'فروش' },
                ].map((n) => (
                  <g key={n.label} className="ai-node" transform={`translate(${n.x}, ${n.y - 60})`} opacity="0">
                    <rect x="-55" y="-24" width="110" height="48" rx="12" fill="#ffffff" stroke="#14B8A6" strokeWidth="2" />
                    <text x="0" y="6" textAnchor="middle" fontSize="14" fontWeight="600" fill="#0F172A">{n.label}</text>
                  </g>
                ))}
                {/* اتصال مغز به گره‌ها */}
                {[
                  'M380 230 C 420 200, 415 150, 440 100',
                  'M382 255 L 418 255',
                  'M380 280 C 420 310, 415 340, 440 342',
                ].map((d, i) => (
                  <path
                    key={`b${i}`}
                    className="ai-connector"
                    d={d}
                    fill="none"
                    stroke="#99F6E4"
                    strokeWidth="2.5"
                    strokeDasharray="300"
                    strokeDashoffset="300"
                    strokeLinecap="round"
                  />
                ))}

                <foreignObject x="20" y="20" width="180" height="60">
                  <div className="flex items-center gap-2 text-navy-400 text-xs font-medium bg-white/90 rounded-full px-3 py-2 border border-navy-100">
                    <Factory className="w-4 h-4" />
                    قبل: فرآیندهای دستی
                  </div>
                </foreignObject>
                <foreignObject x="340" y="20" width="170" height="60">
                  <div className="flex items-center gap-2 text-teal text-xs font-medium bg-teal-50 rounded-full px-3 py-2 border border-teal-200">
                    <Bot className="w-4 h-4" />
                    بعد: اتوماسیون AI
                  </div>
                </foreignObject>
              </svg>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
